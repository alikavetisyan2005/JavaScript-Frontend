"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "./(helpers)/types";
import axios from "axios";
import { get } from "http";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get<User[]>("/api/users")
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

 const handleDelete = (id: string) => {
  axios
    .delete("/api/users", {
      data: { id },
    })
    .then(() => {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    })
    .catch((err) => console.log(err));
};

  return (
    <>
      <nav className="bg-slate-900 text-white px-6 py-4 shadow-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <Link
            href="/"
            className="text-lg font-semibold hover:text-cyan-300 transition-colors duration-200"
          >
            Home
          </Link>

          <Link
            href="/users/add"
            className="rounded-md bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 transition-colors duration-200"
          >
            Add User
          </Link>
        </div>
      </nav>

      <div className="mx-auto mt-10 max-w-6xl rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/20">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h1 className="text-4xl font-semibold text-white">Users</h1>
          <p className="text-sm text-slate-400">Total users: {users.length}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-800 text-left text-sm text-slate-200">
            <thead className="border-b border-slate-800 bg-slate-900/80 text-slate-300">
              <tr>
                <th className="px-5 py-3 font-semibold uppercase tracking-[0.18em]">
                  ID
                </th>
                <th className="px-5 py-3 font-semibold uppercase tracking-[0.18em]">
                  Name
                </th>
                <th className="px-5 py-3 font-semibold uppercase tracking-[0.18em]">
                  Age
                </th>
                <th className="px-5 py-3 font-semibold uppercase tracking-[0.18em]">
                  Salary
                </th>
                <th className="px-5 py-3 font-semibold uppercase tracking-[0.18em]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-950/70">
              {users.map((user) => (
                <tr key={user.id} className="transition hover:bg-slate-900/80">
                  <td className="whitespace-nowrap px-5 py-4 font-medium text-slate-100">
                    {user.id}
                  </td>

                  <td className="px-5 py-4">{user.name}</td>
                  <td className="px-5 py-4">{user.age}</td>
                  <td className="px-5 py-4">${user.salary.toLocaleString()}</td>
                  <td className="px-5 py-4 space-x-2">
                    <Link href={`/users/update/${user.id}`} className="cursor-pointer rounded-md bg-cyan-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-cyan-500">
                      Update
                    </Link>
                    <button onClick={() => handleDelete(user.id)} className="cursor-pointer rounded-md bg-rose-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-rose-500">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
