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
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const _cors = require("cors");
const axios_1 = require("axios");
const https = require("https");
const fs_1 = require("fs");
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
            const result = axios_1.default.get('https://www.it.chula.ac.th/downloads', {
                auth: {
                    username, password
                },
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false
                })
            }).then((response) => { }).catch((error) => {
                switch (error.response.status) {
                    case 403:
                        return true;
                    default:
                        return false;
                }
            });
            const out = {};
            if (yield result) {
                out.success = true;
                out.token = yield admin.auth().createCustomToken(`cunet-${username}`);
            }
            else {
                out.success = false;
            }
            resp.status(200).send(out);
        }
    }));
});
