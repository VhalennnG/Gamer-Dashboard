import * as functions from "firebase-functions";
import app from "./core/app";

exports.api = functions.https.onRequest(app);
