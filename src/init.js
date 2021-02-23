import "@babel/polyfill";
import dotenv from "dotenv";

dotenv.config();

import "./db";
import app from "./app";
import "./models/Video";
import "./models/Comment";
import "./models/User";

const PORT = process.env.PORT || 4010;

const handleListening = () =>
  console.log(`✅  Listening on: http://localhost:${PORT}`);

console.log(PORT);

if (process.env.PORT) {
  app.listen(PORT, handleListening);
} else {
  app.listen(PORT, handleListening);
}
