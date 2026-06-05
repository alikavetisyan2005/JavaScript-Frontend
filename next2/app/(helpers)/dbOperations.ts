import { randomUUID } from "crypto";
import { User } from "./types";
import { readFile, writeFile } from "fs/promises";
import { NextResponse } from "next/server";


export const getAllUsers = async () => {
  const users = await readFile("./users.json", "utf-8");

  if (!users) return [];

  return JSON.parse(users);
};

export const addNewUser = async (user: User) => {
  let users = await getAllUsers();

  users.push({
    ...user,
    id: randomUUID(),
  });

  await writeFile("./users.json", JSON.stringify(users));
};

export const updateUser = async (updatedUser: User) => {
  let users: User[] = await getAllUsers();

  const index = users.findIndex(u => u.id === updatedUser.id);

  if (index === -1) return null;

  users[index] = {
    ...users[index],
    ...updatedUser,
  };

  await writeFile("./users.json", JSON.stringify(users));

  return users[index];
};


export const deleteUser = async(id: string) => {
  let users: User[] = await getAllUsers()
  const user = users.find(u => u.id === id)
  if(!user){
    return null;
  }

  const filteredUsers = users.filter(u => u.id !== user.id);

  await writeFile("./users.json", JSON.stringify(filteredUsers));

  return user

}