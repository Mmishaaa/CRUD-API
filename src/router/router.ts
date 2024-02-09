import userController from "../userControllers/userController";
import response, { errorResponse } from "../utils/response";
import getRequestBody from "../utils/getRequestBody";
import { validate as uuidValidate } from "uuid";
import isExistingEndPoint from "../utils/isExistingEndPoint";
import { IncomingMessage, ServerResponse } from "http";
import httpMethod from "../constants/methodConstants";
import appSettings from "../constants/statusCodeConstants";

const router = async (
  url: string,
  method: string,
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> => {
  if (!isExistingEndPoint(url)) {
    errorResponse(
      res,
      appSettings.HTTP_NOT_FOUND,
      "you're trying to access a non-exesting endpoint",
    );
    return;
  }
  switch (method) {
    case httpMethod.GET:
      try {
        if (url.startsWith("/api/users")) {
          const userId = url.split("/")[3];

          if (!userId) {
            const users = userController.getAllUsers();
            response(res, appSettings.HTTP_OK, users);
            return;
          }

          if (!uuidValidate(userId)) {
            errorResponse(
              res,
              appSettings.HTTP_BAD_REQUEST,
              "userid is invalid",
            );
            return;
          }

          const user = userController.getUserById(userId);
          if (!user) {
            errorResponse(
              res,
              appSettings.HTTP_NOT_FOUND,
              `user with id ${userId} doesn't exist`,
            );
            return;
          }

          response(res, appSettings.HTTP_OK, user);
          return;
        }
        errorResponse(
          res,
          appSettings.HTTP_NOT_FOUND,
          "you're trying to access a non-exesting endpoint",
        );
        return;
      } catch {
        errorResponse(
          res,
          appSettings.HTTP_INTERNAL_ERROR,
          "error occures on the server side",
        );
        return;
      }

    case httpMethod.POST:
      try {
        if (url === "/api/users" || url === "/api/users/") {
          const user = await getRequestBody(req);
          const newUser = userController.createUser(user);
          if (!newUser) {
            errorResponse(
              res,
              appSettings.HTTP_BAD_REQUEST,
              "request body does not contain required fields",
            );
            return;
          }
          response(res, appSettings.HTTP_CREATED, user);
          return;
        }
        errorResponse(
          res,
          appSettings.HTTP_NOT_FOUND,
          "you're trying to access a non-exesting endpoint",
        );
        return;
      } catch {
        errorResponse(
          res,
          appSettings.HTTP_INTERNAL_ERROR,
          "error occures on the server side",
        );
        return;
      }

    case httpMethod.PUT:
      try {
        if (url.startsWith("/api/users")) {
          const userId = url.split("/")[3];
          const updatedUser = await getRequestBody(req);

          if (!userId) {
            const users = userController.getAllUsers();
            response(res, appSettings.HTTP_OK, users);
            return;
          }

          if (!uuidValidate(userId)) {
            errorResponse(
              res,
              appSettings.HTTP_BAD_REQUEST,
              "userid is invalid",
            );
            return;
          }

          const isUserExist = userController.getUserById(userId);

          if (isUserExist) {
            const validatedUser = userController.updateUser(
              updatedUser,
              userId,
            );
            if (!validatedUser) {
              errorResponse(
                res,
                appSettings.HTTP_BAD_REQUEST,
                `request body does not contain required fields`,
              );
              return;
            }
            response(res, appSettings.HTTP_OK, validatedUser);
            return;
          }
          errorResponse(
            res,
            appSettings.HTTP_NOT_FOUND,
            `user with id ${userId} doesn't exist`,
          );
          return;
        }
        errorResponse(
          res,
          appSettings.HTTP_NOT_FOUND,
          "you're trying to access a non-exesting endpoint",
        );
        return;
      } catch {
        errorResponse(
          res,
          appSettings.HTTP_INTERNAL_ERROR,
          "error occures on the server side",
        );
        return;
      }
    case httpMethod.DELETE:
      try {
        if (url.startsWith("/api/users")) {
          const userId = url.split("/")[3];

          if (!userId) {
            const users = userController.getAllUsers();
            response(res, appSettings.HTTP_OK, users);
            return;
          }

          if (!uuidValidate(userId)) {
            errorResponse(
              res,
              appSettings.HTTP_BAD_REQUEST,
              "userid is invalid",
            );
            return;
          }

          const isUserExist = userController.getUserById(userId);
          if (isUserExist) {
            userController.deleteUser(userId);
            response(res, appSettings.HTTP_NO_CONTENT, null);
            return;
          }
          errorResponse(
            res,
            appSettings.HTTP_NOT_FOUND,
            `user with id ${userId} doesn't exist`,
          );
          return;
        }
        errorResponse(
          res,
          appSettings.HTTP_NOT_FOUND,
          `you're trying to access a non-exesting endpoint`,
        );
        return;
      } catch {
        errorResponse(
          res,
          appSettings.HTTP_INTERNAL_ERROR,
          "error occures on the server side",
        );
        return;
      }
    default:
      response(res, appSettings.HTTP_NOT_FOUND, {
        message: "You're trying to use a not-provided method",
      });
      break;
  }
};

export default router;
