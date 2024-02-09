import { IncomingMessage } from "http";
export const loggerMiddleware = (req: IncomingMessage) => {
  console.log(`${req.method} ${req.url}`);
};
