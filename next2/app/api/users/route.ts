import {
  addNewUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "@/app/(helpers)/dbOperations";
import { User } from "@/app/(helpers)/types";
import { NextResponse } from "next/server";

export const GET = async () => {
  const users = await getAllUsers();
  return NextResponse.json(users);
};

export const POST = async (req: Request) => {
  const body: User = await req.json();

  if (!body.name?.trim()) {
    return NextResponse.json(
      { message: "Name is required field" },
      { status: 400 },
    );
  }

  if (!body.age) {
    return NextResponse.json(
      { message: "age is required field" },
      { status: 400 },
    );
  }

  if (!body.salary) {
    return NextResponse.json(
      { message: "salary is required field" },
      { status: 400 },
    );
  }

  await addNewUser(body);
  return NextResponse.json({ ok: true }, { status: 201 });
};

export const PATCH = async (req: Request) => {
  const body: User = await req.json();
  if (!body.name?.trim()) {
    return NextResponse.json(
      { message: "Name is required field" },
      { status: 400 },
    );
  }

  if (!body.age) {
    return NextResponse.json(
      { message: "age is required field" },
      { status: 400 },
    );
  }

  if (!body.salary) {
    return NextResponse.json(
      { message: "salary is required field" },
      { status: 400 },
    );
  }
  const updatedUser = await updateUser(body);

  if (!updatedUser) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    message: "User updated successfully",
    user: updatedUser,
  });
};

export const DELETE = async (req: Request) => {
  const body = await req.json();
  const id = body.id;

  if(!id){
    return NextResponse.json({
    message: "id is required"
  });
  }

  const deletedUser = await deleteUser(id)

  if (!deletedUser) {
    return NextResponse.json(
      { message: "User not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    message: "User deleted successfully",
    user: deletedUser,
  });


};
