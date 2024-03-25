import { HttpResponse, http } from "msw";
import { CreateUserFormData, User } from "../../../types";

const userList: User[] = [
  { id: 1, name: "テストユーザー1" },
  { id: 2, name: "テストユーザー2" },
  { id: 3, name: "テストユーザー3" },
  { id: 4, name: "テストユーザー4" },
];

// ユーザー一覧取得api
export const getAllUsersHandler = http.get("/api/users", ({ request }) => {
  const url = new URL(request.url);
  const userName = url.searchParams.get("name");

  if (!userName) {
    return HttpResponse.json(userList);
  }

  const filteredUserList = userList.filter((user) => {
    return user.name === userName;
  });

  return HttpResponse.json(filteredUserList);
});

// 特定のユーザー取得api
export const getUserHandler = http.get("/api/users/:userId", ({ params }) => {
  const userId = Number(params.userId);

  if (!userId) {
    return HttpResponse.json(null, {
      status: 400,
      statusText: "bad request",
    });
  }
  const user = userList.filter((user) => {
    return user.id === Number(userId);
  })[0];

  if (!user) {
    return HttpResponse.json(null, {
      status: 404,
      statusText: "no resource",
    });
  }
  return HttpResponse.json(user);
});

// 新規ユーザー作成api
export const createUserHandler = http.post(
  "/api/users",
  async ({ request }) => {
    const body = (await request.json()) as CreateUserFormData;
    const newUser: User = { id: userList.length + 1, name: body.name };
    userList.push(newUser);

    return HttpResponse.json(null, {
      status: 201,
      statusText: "success",
    });
  }
);
