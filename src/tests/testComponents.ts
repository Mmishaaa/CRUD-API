import { v4 as uuidv4 } from "uuid";

const correctUser = {
  id: undefined,
  username: "user1",
  age: 19,
  hobbies: ["programming", "sport"],
};

const updatedUser = {
  id: undefined,
  username: "updatedUser1",
  age: 20,
  hobbies: ["programming2", "sport2"],
};

const wrongUser = {
  id: 1,
  username: "user1",
  age: "19",
  hobbies: ["programming", "sport"],
};

const randomUserId = uuidv4();

export { correctUser, updatedUser, wrongUser, randomUserId };
