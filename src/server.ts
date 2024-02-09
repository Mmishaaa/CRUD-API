import http from "http";
import { errorResponse } from "./utils/response";
import dotenv from "dotenv";
import parseRequest from "./utils/parseRequest";
import { loggerMiddleware } from "./utils/middlewares";

dotenv.config();
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  try {
    parseRequest(req, res);
  } catch (err) {
    errorResponse(res, 500, "error occures on the server side");
  }
});

server.on("request", loggerMiddleware);

server.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});

export default server;
