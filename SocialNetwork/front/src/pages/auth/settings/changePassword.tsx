import { useForm } from "react-hook-form";
import { Http } from "../../../config/api";
import { useState } from "react";
import axios from "axios";

type ChangePasswordForm = {
  currentPassword: string;
  newPassword: string;
};

export const ChangePassword = () => {
  const [done, setDone] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordForm>();

  const onSubmit = (data: ChangePasswordForm) => {
    Http.patch("/account/settings/password", {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    })
      .then((response) => {
        console.log(response.data);
        setDone(response.data.message);
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          const response = err.response?.data;
          setError(response.message);
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-[0_25px_60px_-35px_rgba(15,23,42,0.8)] backdrop-blur-xl">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400/80">
              Password settings
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-white">
              Change your password
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Keep your account secure by updating your password regularly.
            </p>
          </div>

          <div className="grid gap-4">
            {errors.currentPassword && (
              <p className="text-red-400">{errors.currentPassword.message}</p>
            )}
            {errors.newPassword && (
              <p className="text-red-400">{errors.newPassword.message}</p>
            )}
            {done && <p className="text-green-400">{done}</p>}
            {error && <p className="text-red-400">{error}</p>}
            <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
              <label className="block text-sm font-semibold text-slate-200">
                Current password
              </label>
              <input
                {...register("currentPassword", {
                  required: "Please fill your current password",
                })}
                type="password"
                placeholder="Enter current password"
                className="mt-3 w-full rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/20"
              />
            </div>
            <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
              <label className="block text-sm font-semibold text-slate-200">
                New password
              </label>
              <input
                {...register("newPassword", {
                  required: "Please fill your new password",
                  minLength: {
                    value: 6,
                    message: "Password must have at least 6 charachters",
                  },
                })}
                type="password"
                placeholder="Create a new password"
                className="mt-3 w-full rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-white placeholder:text-slate-500 focus:border-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/20"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-400 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-fuchsia-500/20 transition hover:brightness-105"
          >
            Save new password
          </button>
        </div>
      </section>
    </form>
  );
};
