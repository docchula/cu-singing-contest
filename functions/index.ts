import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as _cors from 'cors';
import axios from 'axios';
import * as https from 'https';
import { readFileSync } from 'fs';

const cors = _cors({ origin: true });

const config = {
  credential: admin.credential.cert(JSON.parse(readFileSync('cunet-cert.json').toString())),
  databaseURL: ''
};

admin.initializeApp(config);

export const authenticate = functions.https.onRequest((req, resp) => {
  cors(req, resp, async () => {
    if (req.method.toLowerCase() !== 'post') {
      resp.status(405).end();
    } else {
      const data = req.body;
      const username = data.username;
      const password = data.password;
      const result = axios.get('https://www.it.chula.ac.th/downloads', {
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
      const out: any = {};
      if (await result) {
        out.success = true;
        out.token = await admin.auth().createCustomToken(`cunet-${username}`);
      } else {
        out.success = false;
      }
      resp.status(200).send(out);
    }
  });
});
