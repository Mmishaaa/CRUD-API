import users, { IUser } from "../db/db";
import validateUser from "../validate/validateUser";
import { v4 as uuidv4 } from "uuid";

class UserController {
  getAllUsers = (): IUser[] => users;

  getUserById = (userId: string): IUser | undefined => {
    const user = users.find((user) => user.id === userId);
    return user;
  };

  createUser = (user: any): IUser | null => {
    if (validateUser(user)) {
      user.id = uuidv4();
      users.push(user);
      return user;
    }
    return null;
  };

  updateUser = (updatedUser: any, userId: string): IUser | null => {
    const userToUpdate = this.getUserById(userId);
    if (!userToUpdate) return null;

    updatedUser.id = userId;
    if (validateUser(updatedUser)) {
      const indexOfUserToUpdate = users.indexOf(userToUpdate);
      users[indexOfUserToUpdate] = updatedUser;
      return updatedUser;
    }
    return null;
  };

  deleteUser = (userId: string): void => {
    // const userToDelete = users.find((user) => user.id === userId);
    // if(!userToDelete) return;

    // const indexOfUserToDelete = users.indexOf(userToDelete);
    // users.splice(indexOfUserToDelete, 1);

    const indexUserToDelete = users.findIndex((user) => user.id === userId);
    if (indexUserToDelete !== -1) users.splice(indexUserToDelete, 1);
  };
}

export default new UserController();
