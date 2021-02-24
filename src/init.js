import "@babel/polyfill";
import dotenv from "dotenv";

dotenv.config();

import "./src/db";
import app from "./src/app";
import "./src/models/Video";
import "./src/models/Comment";
import "./src/models/User";

const PORT = process.env.PORT || 4001;

const handleListening = () =>
  console.log(`✅  Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
