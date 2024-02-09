import { IncomingMessage } from "http";

const getRequestBody = async (req: IncomingMessage) => {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const user = JSON.parse(body);
        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  });
};

export default getRequestBody;
