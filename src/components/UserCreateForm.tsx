import { FormEvent, useRef } from "react";
import useSWRMutation from "swr/mutation";
import { CreateUserFormData } from "../types";


const createUser = async (
  url: string,
  { arg }: { arg: CreateUserFormData }
) => {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  });
  if (!res.ok) {
    const error = new Error(res.statusText);
    throw error;
  }
  return res.json();
};

export const UserCreateForm = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    "/api/users",
    createUser
  );

  const nameRef = useRef<HTMLInputElement>(null); //refの作成

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const formData = { name: nameRef.current?.value as string };
    await trigger(formData);
  };

  return (
    <>
      <h2># ユーザー作成フォーム</h2>
      <p>{error && error.message}</p>
      <form onSubmit={submit}>
        <label htmlFor="name">ユーザー名：</label>
        <input id="name" type="text" ref={nameRef} required />
        <br />
        <br />
        <button type="submit" disabled={isMutating}>
          ユーザー作成
        </button>
      </form>
    </>
  );
};
