import type { IUser } from "../db/db";
const validateUser = (user: any): user is IUser => {
  const { username, age, hobbies } = user;
  return (
    typeof user === "object" &&
    typeof username === "string" &&
    typeof age === "number" &&
    Array.isArray(hobbies) &&
    hobbies.every((hobby) => typeof hobby === "string")
  );
};

export default validateUser;
