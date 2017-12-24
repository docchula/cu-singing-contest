"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const _cors = require("cors");
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const fs_1 = require("fs");
const https = require("https");
const bcrypt = require("bcrypt");
const cors = _cors({ origin: true });
const config = {
    credential: admin.credential.cert(JSON.parse(fs_1.readFileSync('cunet-cert.json').toString())),
    databaseURL: ''
};
admin.initializeApp(config);
exports.authenticate = functions.https.onRequest((req, resp) => {
    cors(req, resp, () => __awaiter(this, void 0, void 0, function* () {
        if (req.method.toLowerCase() !== 'post') {
            resp.status(405).end();
        }
        else {
            const data = req.body;
            const username = data.username;
            const password = data.password;
            const out = {};
            if (username.startsWith('cusc-temp-')) {
                const hash = (yield admin
                    .database()
                    .ref('config/temp-user')
                    .child(username)
                    .once('value')).val();
                if (bcrypt.compareSync(password, hash)) {
                    out.success = true;
                    out.token = yield admin.auth().createCustomToken(username);
                }
                else {
                    out.success = false;
                }
            }
            else {
                const result = axios_1.default
                    .get('https://www.it.chula.ac.th/downloads', {
                    auth: {
                        username,
                        password
                    },
                    httpsAgent: new https.Agent({
                        rejectUnauthorized: false
                    })
                })
                    .then(response => { })
                    .catch(error => {
                    switch (error.response.status) {
                        case 403:
                            return true;
                        default:
                            return false;
                    }
                });
                if (yield result) {
                    out.success = true;
                    out.token = yield admin.auth().createCustomToken(`cunet-${username}`);
                }
                else {
                    out.success = false;
                }
            }
            resp.status(200).send(out);
        }
    }));
});
exports.resetDay = functions.https.onRequest((req, resp) => {
    cors(req, resp, () => __awaiter(this, void 0, void 0, function* () {
        if (req.method.toLowerCase() !== 'post') {
            resp.status(405).end();
        }
        else {
            const out = {};
            const data = req.body;
            const dayToReset = data.day;
            const dayKey = `day${dayToReset}`;
            yield admin
                .database()
                .ref('data/live')
                .child(dayKey)
                .remove();
            yield admin
                .database()
                .ref('data/live')
                .child(dayKey)
                .child('nextSeq')
                .set(1);
            const usersRef = admin.database().ref('data/users');
            const todayUsersRef = usersRef
                .orderByChild('firstDay/day/id')
                .equalTo(dayToReset);
            const todayUsers = (yield todayUsersRef.once('value')).val();
            const keys = Object.keys(todayUsers);
            for (let i = 0; i <= keys.length - 1; i++) {
                yield admin
                    .database()
                    .ref(`data/users/${keys[i]}/registered`)
                    .remove();
                console.log(`${keys[i]} resetted!`);
            }
            const google = require('googleapis');
            const privKeyString = 
            // tslint:disable-next-line:max-line-length
            '';
            const issuer = '';
            const sub = '';
            const scope = ['https://www.googleapis.com/auth/drive'];
            const jwtClient = new google.auth.JWT(issuer, null, privKeyString, scope, sub);
            const drive = google.drive('v3');
            jwtClient.authorize((err, tokens) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    console.log(err);
                    out.success = false;
                    out.reason = 'Google API JWT failed';
                    resp.status(200).send(out);
                    return;
                }
                else {
                    // Find folder
                    const dayRef = admin
                        .database()
                        .ref('config/dayFolders')
                        .child(`day${dayToReset}`);
                    const dayFolderId = (yield dayRef.once('value')).val();
                    drive.files.delete({
                        auth: jwtClient,
                        fileId: dayFolderId
                    }, (err2, res) => {
                        if (err2) {
                            console.log(err2);
                            out.success = false;
                            out.reason = 'Cannot delete folder';
                            resp.status(200).send(out);
                        }
                        else {
                            drive.files.create({
                                auth: jwtClient,
                                fields: 'id',
                                resource: {
                                    name: `Day${dayToReset}`,
                                    mimeType: 'application/vnd.google-apps.folder',
                                    parents: ['1P16EdwLc4aV_Q9MbHzGpRJhQt6ufu6Tq']
                                }
                            }, (err3, folder) => __awaiter(this, void 0, void 0, function* () {
                                if (err3) {
                                    console.log(err3);
                                    out.success = false;
                                    out.reason = 'Cannot create folder';
                                    resp.status(200).send(out);
                                }
                                else {
                                    yield dayRef.set(folder.id);
                                    out.success = true;
                                    resp.status(200).send(out);
                                }
                            }));
                        }
                    });
                }
            }));
        }
    }));
});
exports.registerContestant = functions.https.onRequest((req, resp) => {
    cors(req, resp, () => __awaiter(this, void 0, void 0, function* () {
        if (req.method.toLowerCase() !== 'post') {
            resp.status(405).end();
        }
        else {
            const data = req.body;
            const uid = data.uid;
            const out = {};
            // Get Contestant Information
            const contestantData = (yield admin
                .database()
                .ref('data/users')
                .child(uid)
                .once('value')).val();
            // Get Current day
            const currentDay = (yield admin
                .database()
                .ref('config/liveDay')
                .once('value')).val();
            if (currentDay !== contestantData.firstDay.day.id &&
                (currentDay !== 6 || !contestantData.allowRound2)) {
                out.success = false;
                out.reason = 'Not this day';
                resp.status(200).send(out);
            }
            else {
                const dayKey = `day${currentDay}`;
                // Check if already registered
                const checkIfRegistered = (yield admin
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
                }
                else {
                    // Get sequence
                    let seq = -1;
                    yield admin
                        .database()
                        .ref('data/live')
                        .child(dayKey)
                        .child('nextSeq')
                        .transaction(nextSeq => {
                        if (nextSeq) {
                            seq = nextSeq;
                            return nextSeq + 1;
                        }
                        else {
                            return -1;
                        }
                    });
                    if (seq !== -1) {
                        // Copy the data to liveData
                        const pad = '00' + seq.toString();
                        const contestantId = `CUSC${currentDay}${pad.substr(pad.length - 2)}`;
                        yield admin
                            .database()
                            .ref('data/live')
                            .child(dayKey)
                            .child('users')
                            .child(contestantId)
                            .set(Object.assign({ uid }, contestantData, { liveStatus: 0 }));
                        if (contestantData.selectedSong.mode === 'live') {
                            out.success = true;
                            out.contestantId = contestantId;
                            resp.status(200).send(out);
                        }
                        else {
                            const filenamePath = currentDay === 6 ? 'data/userFilename2' : 'data/userFilename';
                            // Get song filename
                            const filename = (yield admin
                                .database()
                                .ref(filenamePath)
                                .child(uid)
                                .once('value')).val();
                            // get JWT
                            const google = require('googleapis');
                            const privKeyString = 
                            // tslint:disable-next-line:max-line-length
                            '';
                            const issuer = '';
                            const sub = '';
                            const scope = ['https://www.googleapis.com/auth/drive'];
                            const jwtClient = new google.auth.JWT(issuer, null, privKeyString, scope, sub);
                            const drive = google.drive('v3');
                            jwtClient.authorize((err, tokens) => __awaiter(this, void 0, void 0, function* () {
                                if (err) {
                                    console.log(err);
                                    out.success = true;
                                    out.contestantId = contestantId;
                                    out.fileId = 'Google API JWT failed';
                                    resp.status(200).send(out);
                                    return;
                                }
                                else {
                                    const fileId = filename;
                                    const dayFolderId = (yield admin
                                        .database()
                                        .ref('config/dayFolders')
                                        .child(`day${currentDay}`)
                                        .once('value')).val();
                                    // Create folder
                                    drive.files.create({
                                        fields: 'id',
                                        auth: jwtClient,
                                        resource: {
                                            name: contestantId,
                                            mimeType: 'application/vnd.google-apps.folder',
                                            parents: [dayFolderId]
                                        }
                                    }, (err3, folder) => {
                                        if (err3) {
                                            console.log(err3);
                                            out.success = true;
                                            out.contestantId = contestantId;
                                            out.fileId = 'Cannot create folder';
                                            resp.status(200).send(out);
                                        }
                                        else {
                                            const folderId = folder.id;
                                            // Copy file to folder
                                            drive.files.copy({
                                                auth: jwtClient,
                                                fileId,
                                                fields: 'id',
                                                resource: {
                                                    parents: [folderId]
                                                }
                                            }, (err4, file) => {
                                                if (err4) {
                                                    console.log(err4);
                                                    out.success = true;
                                                    out.contestantId = contestantId;
                                                    out.fileId = 'Cannot copy file';
                                                    resp.status(200).send(out);
                                                }
                                                else {
                                                    out.success = true;
                                                    out.contestantId = contestantId;
                                                    out.fileId = file.id;
                                                    resp.status(200).send(out);
                                                }
                                            });
                                        }
                                    });
                                }
                            }));
                        }
                    }
                    else {
                        out.success = false;
                        out.reason = 'Cannot get sequence';
                        resp.status(200).send(out);
                    }
                }
            }
        }
    }));
});
