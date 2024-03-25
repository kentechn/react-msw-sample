import { User } from "../types";
import useSWR from "swr";
import { fetcher } from "../api/fetcher";

export const UserList = () => {
  const {
    data: users,
    isLoading,
    error,
  } = useSWR<User[]>("/api/users", fetcher);

  if (error) {
    console.log(error)
    return <p>error</p>;
  }

  if (isLoading) {
    return <p>Loading now...</p>;
  }

  if (!users) {
    return <p>ユーザーデータなし</p>;
  }

  return (
    <>
      <h2># ユーザー一覧: </h2>
      <ul>
        {users.map((user) => {
          return <li key={user.id}>{user.name}</li>;
        })}
      </ul>
    </>
  );
};
