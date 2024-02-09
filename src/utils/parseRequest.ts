import { IncomingMessage, ServerResponse } from "http";
import router from "../router/router";

const parseRequest = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;

  if (!url || !method) return;

  router(url, method, req, res);
};

export default parseRequest;
