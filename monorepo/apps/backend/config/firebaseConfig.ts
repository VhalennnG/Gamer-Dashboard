import * as admin from "firebase-admin";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

dotenv.config();

const serviceAccountPath =
  process.env.FIREBASE_SERVICE_ACCOUNT_PATH ?? "./serviceAccountKey.json";
const serviceAccount = JSON.parse(
  fs.readFileSync(path.resolve(serviceAccountPath), "utf8")
);

admin.initializeApp({
  credential: serviceAccount
    ? admin.credential.cert(serviceAccount)
    : admin.credential.applicationDefault(),
});

const db = admin.firestore();
export default db;
