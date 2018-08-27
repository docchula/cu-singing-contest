import axios from 'axios';
import * as _cors from 'cors';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as https from 'https';
import * as bcrypt from 'bcrypt';
import { google } from 'googleapis';

const cors = _cors({ origin: true });

const privKeyString = functions.config().oauth2.priv_key_string;
const issuer = functions.config().oauth2.issuer;
const sub = functions.config().oauth2.sub;

admin.initializeApp();

export const authenticate = functions.https.onCall(async (data, context) => {
  const username: string = data.username;
  const password: string = data.password;
  const out: any = {};
  if (username.startsWith('cusc-temp-')) {
    const hash = (await admin
      .database()
      .ref('config/temp-user')
      .child(username)
      .once('value')).val();
    if (bcrypt.compareSync(password, hash)) {
      out.success = true;
      out.token = await admin.auth().createCustomToken(username);
    } else {
      out.success = false;
    }
  } else {
    const result = axios
      .get('https://www.it.chula.ac.th/downloads', {
        auth: {
          username,
          password
        },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false
        })
      })
      .then(response => {})
      .catch(error => {
        switch (error.response.status) {
          case 403:
            return true;
          default:
            return false;
        }
      });
    if (await result) {
      out.success = true;
      out.token = await admin.auth().createCustomToken(`cunet-${username}`);
    } else {
      out.success = false;
    }
  }
  return out;
});

export const resetDay = functions.https.onRequest((req, resp) => {
  cors(req, resp, async () => {
    if (req.method.toLowerCase() !== 'post') {
      resp.status(405).end();
    } else {
      const out: any = {};
      const data = req.body;
      const dayToReset = data.day;
      const dayKey = `day${dayToReset}`;
      await admin
        .database()
        .ref('data/live')
        .child(dayKey)
        .remove();
      await admin
        .database()
        .ref('data/live')
        .child(dayKey)
        .child('nextSeq')
        .set(1);
      const usersRef = admin.database().ref('data/users');
      const todayUsersRef = usersRef
        .orderByChild('firstDay/day/id')
        .equalTo(dayToReset);
      const todayUsers = (await todayUsersRef.once('value')).val();
      const keys = Object.keys(todayUsers);
      for (let i = 0; i <= keys.length - 1; i++) {
        await admin
          .database()
          .ref(`data/users/${keys[i]}/registered`)
          .remove();
        console.log(`${keys[i]} resetted!`);
      }
      const scope = ['https://www.googleapis.com/auth/drive'];
      const jwtClient = new google.auth.JWT(
        issuer,
        undefined,
        privKeyString,
        scope,
        sub
      );
      const drive = google.drive('v3');
      jwtClient.authorize(async (err: any, tokens: any) => {
        if (err) {
          console.log(err);
          out.success = false;
          out.reason = 'Google API JWT failed';
          resp.status(200).send(out);
          return;
        } else {
          // Find folder
          const dayRef = admin
            .database()
            .ref('config/dayFolders')
            .child(`day${dayToReset}`);
          const dayFolderId = (await dayRef.once('value')).val();
          drive.files.delete(
            {
              auth: jwtClient,
              fileId: dayFolderId
            },
            (err2: any, res: any) => {
              if (err2) {
                console.log(err2);
                out.success = false;
                out.reason = 'Cannot delete folder';
                resp.status(200).send(out);
              } else {
                drive.files.create(
                  {
                    auth: jwtClient,
                    requestBody: {
                      name: `Day${dayToReset}`,
                      mimeType: 'application/vnd.google-apps.folder',
                      parents: ['1P16EdwLc4aV_Q9MbHzGpRJhQt6ufu6Tq']
                    }
                  },
                  async (err3: any, folder: any) => {
                    if (err3) {
                      console.log(err3);
                      out.success = false;
                      out.reason = 'Cannot create folder';
                      resp.status(200).send(out);
                    } else {
                      await dayRef.set(folder.id);
                      out.success = true;
                      resp.status(200).send(out);
                    }
                  }
                );
              }
            }
          );
        }
      });
    }
  });
});

export const registerContestant = functions.https.onRequest((req, resp) => {
  cors(req, resp, async () => {
    if (req.method.toLowerCase() !== 'post') {
      resp.status(405).end();
    } else {
      const data = req.body;
      const uid: string = data.uid;
      const out: any = {};
      // Get Contestant Information
      const contestantData = (await admin
        .database()
        .ref('data/users')
        .child(uid)
        .once('value')).val();
      // Get Current day
      const currentDay: number = (await admin
        .database()
        .ref('config/liveDay')
        .once('value')).val();
      if (
        currentDay !== contestantData.firstDay.day.id &&
        (currentDay !== 6 || !contestantData.allowRound2)
      ) {
        out.success = false;
        out.reason = 'Not this day';
        resp.status(200).send(out);
      } else {
        const dayKey = `day${currentDay}`;
        // Check if already registered
        const checkIfRegistered: any = (await admin
          .database()
          .ref('data/live')
          .child(dayKey)
          .child('users')
          .orderByChild('uid')
          .equalTo(uid)
          .once('value')).val();
        if (checkIfRegistered) {
          out.success = false;
          out.reason = 'Already registered';
          resp.status(200).send(out);
        } else {
          // Get sequence
          let seq = -1;
          await admin
            .database()
            .ref('data/live')
            .child(dayKey)
            .child('nextSeq')
            .transaction(nextSeq => {
              if (nextSeq) {
                seq = nextSeq;
                return nextSeq + 1;
              } else {
                return -1;
              }
            });
          if (seq !== -1) {
            // Copy the data to liveData
            const pad = '00' + seq.toString();
            const contestantId = `CUSC${currentDay}${pad.substr(
              pad.length - 2
            )}`;
            await admin
              .database()
              .ref('data/live')
              .child(dayKey)
              .child('users')
              .child(contestantId)
              .set({
                uid,
                ...contestantData,
                liveStatus: 0
              });
            if (contestantData.selectedSong.mode === 'live') {
              out.success = true;
              out.contestantId = contestantId;
              resp.status(200).send(out);
            } else {
              const filenamePath: string | undefined =
                currentDay === 6 ? 'data/userFilename2' : 'data/userFilename';
              // Get song filename
              const filename = (await admin
                .database()
                .ref(filenamePath)
                .child(uid)
                .once('value')).val();
              // get JWT
              const scope = ['https://www.googleapis.com/auth/drive'];
              const jwtClient = new google.auth.JWT(
                issuer,
                undefined,
                privKeyString,
                scope,
                sub
              );
              const drive = google.drive('v3');
              jwtClient.authorize(async (err: any, tokens: any) => {
                if (err) {
                  console.log(err);
                  out.success = true;
                  out.contestantId = contestantId;
                  out.fileId = 'Google API JWT failed';
                  resp.status(200).send(out);
                  return;
                } else {
                  const fileId = filename;
                  const dayFolderId = (await admin
                    .database()
                    .ref('config/dayFolders')
                    .child(`day${currentDay}`)
                    .once('value')).val();
                  // Create folder
                  drive.files.create(
                    {
                      auth: jwtClient,
                      requestBody: {
                        name: contestantId,
                        mimeType: 'application/vnd.google-apps.folder',
                        parents: [dayFolderId]
                      }
                    },
                    (err3: any, folder: any) => {
                      if (err3) {
                        console.log(err3);
                        out.success = true;
                        out.contestantId = contestantId;
                        out.fileId = 'Cannot create folder';
                        resp.status(200).send(out);
                      } else {
                        const folderId = folder.id;
                        // Copy file to folder
                        drive.files.copy(
                          {
                            auth: jwtClient,
                            fileId,
                            requestBody: {
                              parents: [folderId]
                            }
                          },
                          (err4: any, file: any) => {
                            if (err4) {
                              console.log(err4);
                              out.success = true;
                              out.contestantId = contestantId;
                              out.fileId = 'Cannot copy file';
                              resp.status(200).send(out);
                            } else {
                              out.success = true;
                              out.contestantId = contestantId;
                              out.fileId = file.id;
                              resp.status(200).send(out);
                            }
                          }
                        );
                      }
                    }
                  );
                }
              });
            }
          } else {
            out.success = false;
            out.reason = 'Cannot get sequence';
            resp.status(200).send(out);
          }
        }
      }
    }
  });
});
