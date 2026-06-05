"use client";
import { User } from "@/app/(helpers)/types";
import axios from "axios";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddUser() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [form, setForm] = useState<{
    id: string;
    name: string;
    age: string;
    salary: string;
  }>({
    id: "",
    name: "",
    age: "",
    salary: "",
  });

  const handleSubmit = (e: FormEvent) => {
    setError("")
    e.preventDefault();

    const payload = {
      id: form.id,
      name: form.name,
      age: form.age ? Number(form.age) : undefined,
      salary: form.salary ? Number(form.salary) : undefined,
    };
    if (!payload.name.trim()) setError("Name is required");
    if (!payload.age) setError("Age is required");
    if (!payload.salary) setError("Salary is required");

    axios
      .post("/api/users", payload)
      .then((res) => router.push("/"))
      .catch((err) => console.log(err))
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6">
      <div className="w-full max-w-md overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950/95 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.35)]">
        <div className="mb-6 rounded-3xl bg-slate-900/80 px-6 py-5 text-center shadow-inner shadow-slate-950/30">
          <h1 className="text-3xl font-semibold tracking-tight text-cyan-300">
            Add User
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Create a new user with the app’s color-themed form.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            {error && <p className="text-red-400">{error}</p>}
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition duration-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
              placeholder="Enter name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Age
            </label>
            <input
              type="number"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition duration-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
              placeholder="Enter age"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Salary
            </label>
            <input
              type="number"
              value={form.salary}
              onChange={(e) => setForm({ ...form, salary: e.target.value })}
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition duration-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
              placeholder="Enter salary"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition duration-200 hover:bg-cyan-400"
          >
            Save User
          </button>
        </form>
      </div>
    </main>
  );
}
