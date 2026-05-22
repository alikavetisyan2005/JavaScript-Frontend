import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import type { User } from "../../../helpers/types";
import { Http } from "../../../config/api";
import { useState } from "react";
import axios from "axios";



type AuthUser = Pick<User, "username" | "password">;
export const Signin = () => {
  const {register, handleSubmit, formState: {errors}}= useForm<AuthUser>()
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleSignin:SubmitHandler<AuthUser> = (data) => {
    Http.post<{token: string}>("auth/signin", data)
    .then(res => {
      localStorage.setItem("auth_token", res.data.token)
      navigate("/profile")
    })
    .catch(err => {
      if(axios.isAxiosError(err)){
        const response = err.response?.data;
        setError(response.message);
      }
    })

  }
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-700 via-violet-700 to-fuchsia-600 flex items-center justify-center px-4 py-10">
      <div className="bg-blob bg-blob-sky" />
      <div className="bg-blob bg-blob-fuchsia" />
      <div className="w-full max-w-md rounded-[28px] bg-slate-950/95 border border-white/10 p-8 shadow-[0_25px_60px_-35px_rgba(15,23,42,0.8)]">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-300/80">
            Social Network
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white">Sign in</h2>
          <p className="mt-2 text-sm text-slate-400">
            Login with your account to continue.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(handleSignin)}>
          <div>
            {error && <p className="text-red-400">{error}</p>}
            {errors.username && <p className="text-red-400"> {errors.username.message}</p>}
            {errors.password && <p className="text-red-400"> {errors.password.message}</p>} 
          </div>
          <div className="space-y-2">
            <label className="block text-sm text-slate-300">Username</label>
            <input
              type="text"
              className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/20"
              placeholder="Enter your username"
              {...register("username", {required: "Please fill the username"})}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-slate-300">Password</label>
            <input
              type="password"
              className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-500 focus:border-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/20"
              placeholder="Enter your password"
              {...register("password", {required: "Please fill the password"})}
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-2xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            Sign In
          </button>

          <div className="mt-4 text-center text-sm text-slate-400">
            Don&apos;t have an account?{" "}
            <Link
              to={"/signup"}
              className="font-semibold text-sky-300 hover:text-white"
            >
              Create account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
