const regexUsers = /^\/api\/users$/;
const regexUsersSlash = /^\/api\/users\/$/;
const regexUsersWithId = /^\/api\/users\/[\w-]+$/;
const regexUsersWithIdSlash = /^\/api\/users\/[\w-]+\/$/;

export default [
  regexUsers,
  regexUsersSlash,
  regexUsersWithId,
  regexUsersWithIdSlash,
];
