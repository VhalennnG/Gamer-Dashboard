import * as functions from "firebase-functions";
import app from "./core/app";

// Mengexport app Express sebagai fungsi Firebase
exports.api = functions.https.onRequest(app);
