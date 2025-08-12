"use client";

import { createUser } from "./action";

export default function CreateUserButton() {
  return <button onClick={createUser}>Create User</button>;
}
