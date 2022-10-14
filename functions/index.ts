import axios from "axios";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import {google} from "googleapis";

const privKeyString = functions.config().oauth2.priv_key_string;
const issuer = functions.config().oauth2.issuer;
const sub = functions.config().oauth2.sub;
const appId = functions.config().chula_sso.app_id;
const appSecret = functions.config().chula_sso.app_secret;

admin.initializeApp();

export const chulaSso = functions.https.onCall(async (data, context) => {
  const ticket = data.ticket;
  try {
    const response = await axios.get(
        "https://account.it.chula.ac.th/serviceValidation",
        {
          headers: {
            DeeAppId: appId,
            DeeAppSecret: appSecret,
            DeeTicket: ticket,
          },
        }
    );
    if (response.status === 200 && response.data?.ouid) {
      const studentId = (response.data.ouid as string).substring(0, 8);
      const token = await admin.auth().createCustomToken(`cunet-${studentId}`);
      return {
        success: true,
        token,
      };
    } else {
      return {
        success: false,
      };
    }
  } catch (e) {
    console.error("Error occured while validating chulaSSO ticket", e);
    return {
      success: false,
      message: "Unexpected Error",
    };
  }
});

export const resetDay = functions.https.onCall(async (data, context) => {
  const out: any = {};
  const dayToReset = data.day;
  const dayKey = `day${dayToReset}`;
  await admin
      .database()
      .ref("data/live")
      .child(dayKey)
      .remove();
  await admin
      .database()
      .ref("data/live")
      .child(dayKey)
      .child("nextSeq")
      .set(1);
  const usersRef = admin.database().ref("data/users");
  const todayUsersRef =
    dayToReset === 6 ?
      usersRef.orderByChild("allowRound2").equalTo(true) :
      usersRef.orderByChild("firstDay/id").equalTo(dayToReset);
  const todayUsers = (await todayUsersRef.once("value")).val();
  const keys = Object.keys(todayUsers);
  const registeredKey = dayToReset === 6 ? "registered2" : "registered";
  for (let i = 0; i <= keys.length - 1; i++) {
    await admin
        .database()
        .ref(`data/users/${keys[i]}`)
        .child(registeredKey)
        .remove();
    console.log(`${keys[i]} resetted!`);
  }
  const scope = ["https://www.googleapis.com/auth/drive"];
  const jwtClient = new google.auth.JWT(
      issuer,
      undefined,
      privKeyString,
      scope,
      sub
  );
  const drive = google.drive("v3");
  await jwtClient.authorize();
  const dayRef = admin
      .database()
      .ref("config/dayFolders")
      .child(`day${dayToReset}`);
  const dayFolderId = (await dayRef.once("value")).val();
  try {
    try {
      await drive.files.delete({
        auth: jwtClient,
        fileId: dayFolderId,
        supportsAllDrives: true,
      });
    } catch (e) {
      // Allow failure, in that case, we trash it instead.
      try {
        await drive.files.update({
          auth: jwtClient,
          fileId: dayFolderId,
          supportsAllDrives: true,
          requestBody: {
            trashed: true,
          },
        });
      } catch (e) {
        // Still allow failure, in that case, it is not created yet.
      }
    }
    const parentFolderIdRef = admin
        .database()
        .ref("config/dayParentFolder")
        .once("value");
    const parentFolderId = (await parentFolderIdRef).val();
    try {
      const createResult = await drive.files.create({
        auth: jwtClient,
        requestBody: {
          name: `Day${dayToReset}`,
          mimeType: "application/vnd.google-apps.folder",
          parents: [parentFolderId],
        },
        supportsAllDrives: true,
      });
      await dayRef.set(createResult.data.id);
      out.success = true;
      return out;
    } catch (e) {
      console.log(e);
      out.success = false;
      out.reason = "Cannot create folder";
      return out;
    }
  } catch (e) {
    console.log(e);
    out.success = false;
    out.reason = "Google API JWT failed";
    return out;
  }
});

export const registerContestant = functions.https.onCall(
    async (data, context) => {
      const uid: string = data.uid;
      const out: any = {};
      // Get Contestant Information
      const contestantData = (await admin
          .database()
          .ref("data/users")
          .child(uid)
          .once("value")).val();
      // Get Current day
      const currentDay: number = (await admin
          .database()
          .ref("config/liveDay")
          .once("value")).val();
      if (
        currentDay !== contestantData.firstDay.id &&
      (currentDay !== 6 || !contestantData.allowRound2)
      ) {
        out.success = false;
        out.reason = "Not this day";
        return out;
      } else {
        const dayKey = `day${currentDay}`;
        // Check if already registered
        const checkIfRegistered: any = (await admin
            .database()
            .ref("data/live")
            .child(dayKey)
            .child("users")
            .orderByChild("uid")
            .equalTo(uid)
            .once("value")).val();
        if (checkIfRegistered) {
          out.success = false;
          out.reason = "Already registered";
          return out;
        } else {
        // Get sequence
          let seq = -1;
          await admin
              .database()
              .ref("data/live")
              .child(dayKey)
              .child("nextSeq")
              .transaction((nextSeq) => {
                if (nextSeq) {
                  seq = nextSeq;
                  return nextSeq + 1;
                } else {
                  return -1;
                }
              });
          if (seq !== -1) {
          // Copy the data to liveData
            const pad = "00" + seq.toString();
            // eslint-disable-next-line max-len
            const contestantId = `CUSC${currentDay}${pad.substring(pad.length - 2)}`;
            await admin
                .database()
                .ref("data/live")
                .child(dayKey)
                .child("users")
                .child(contestantId)
                .set({
                  uid,
                  ...contestantData,
                  liveStatus: 0,
                });
            if (contestantData.selectedSong.mode === "live") {
              out.success = true;
              out.contestantId = contestantId;
              return out;
            } else {
              const filenamePath: string =
              currentDay === 6 ? "songUrl2" : "songUrl";
              // Get song filename
              const fullFilename = contestantData[filenamePath] as string;
              const filename = fullFilename.replace(
                  "https://drive.google.com/open?id=",
                  ""
              );
              // get JWT
              const scope = ["https://www.googleapis.com/auth/drive"];
              const jwtClient = new google.auth.JWT(
                  issuer,
                  undefined,
                  privKeyString,
                  scope,
                  sub
              );
              const drive = google.drive("v3");
              try {
                await jwtClient.authorize();
                const fileId = filename;
                const dayFolderId = (await admin
                    .database()
                    .ref("config/dayFolders")
                    .child(`day${currentDay}`)
                    .once("value")).val();
                // Create folder
                try {
                  const createResult = await drive.files.create({
                    auth: jwtClient,
                    requestBody: {
                      name: contestantId,
                      mimeType: "application/vnd.google-apps.folder",
                      parents: [dayFolderId],
                    },
                    supportsAllDrives: true,
                  });
                  try {
                    const copyResult = await drive.files.copy({
                      auth: jwtClient,
                      fileId,
                      requestBody: {
                        parents: [createResult.data.id!],
                      },
                      supportsAllDrives: true,
                    });
                    out.success = true;
                    out.contestantId = contestantId;
                    out.fileId = copyResult.data.id;
                    return out;
                  } catch (e) {
                    console.log(e);
                    out.success = true;
                    out.contestantId = contestantId;
                    out.fileId = "Cannot copy file";
                    return out;
                  }
                } catch (e) {
                  console.log(e);
                  out.success = true;
                  out.contestantId = contestantId;
                  out.fileId = "Cannot create folder";
                  return out;
                }
              } catch (e) {
                console.log(e);
                out.success = true;
                out.contestantId = contestantId;
                out.fileId = "Google API JWT failed";
                return out;
              }
            }
          } else {
            out.success = false;
            out.reason = "Cannot get sequence";
            return out;
          }
        }
      }
    }
);
