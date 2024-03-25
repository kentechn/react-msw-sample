import { cookieTestHandler } from "./cookie";
import { createUserHandler, getAllUsersHandler, getUserHandler } from "./users";

export const handlers = [
  getAllUsersHandler,
  getUserHandler,
  createUserHandler,
  cookieTestHandler,
];
