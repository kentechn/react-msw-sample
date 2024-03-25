import { useState } from "react";
import { fetcher } from "../api/fetcher";
import { User } from "../types";
import useSWR from "swr";

export const UserInfo = () => {
  const [userId, setUserId] = useState<number>(1);
  const {
    data: user,
    isLoading,
    error,
  } = useSWR<User>(`/api/users/${userId}`, fetcher);

  const { data: users } = useSWR<User[]>("/api/users", fetcher);

  if (error) {
    return <p>エラーメッセージ：{error.message}</p>;
  }

  if (isLoading) {
    return <p>Loading now...</p>;
  }

  if (!user || !users) {
    return <p>ユーザーデータなし</p>;
  }

  return (
    <>
      <h2># テストユーザー1情報: </h2>
      <label>
        表示したいユーザーIDを選択:
        <select
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
        >
          {users.map((user) => {
            return (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            );
          })}
        </select>
      </label>

      <p>ID: {user.id}</p>
      <p>ユーザー名: {user.name}</p>
    </>
  );
};
