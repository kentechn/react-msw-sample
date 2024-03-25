export type User = {
  id: number;
  name: string;
};

export type CreateUserFormData = Pick<User, "name">;

