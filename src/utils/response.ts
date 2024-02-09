import { ServerResponse } from "http";

export const response = (
  res: ServerResponse,
  statusCode: number,
  data: any,
) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.write(JSON.stringify(data));
  res.end();
};

export const errorResponse = (
  res: ServerResponse,
  statusCode: number,
  msg: any,
) => {
  res.writeHead(statusCode, { "Content-Type": "text/plain" });
  res.write(msg);
  res.end();
};

export default response;
