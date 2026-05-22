import { Outlet, useNavigate } from "react-router-dom";
import { NavLinks } from "./navLink";
import { useEffect, useState } from "react";
import { Http } from "../../config/api";
import type { Account } from "../../helpers/types";



export const AuthLayout = () => {

    const [user, setUser] = useState<Account | null>(null)
    const navigate = useNavigate()
    useEffect(() => {
        Http
        .get<{user: Account}>("/auth/user")
        .then(response => {
            setUser(response.data.user)
        })
        .catch(err => {
            console.log(err)
            navigate("/")
    })
    }, [])
  return user && (
    <div className="relative min-h-screen overflow-hidden bg-[#05060d] text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(236,72,153,0.18),_transparent_24%)]" />
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-4 py-10">
        <section className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.9)] backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400/80">
                Social Network
              </p>
              <h2 className="text-2xl font-semibold text-white sm:text-5xl">
                Welcome to your profile hub
              </h2>
              
            </div>
            <button className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-400 px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-fuchsia-500/20 transition hover:scale-[1.01]">
              Logout
            </button>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <NavLinks/>
          <main className="rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-[0_25px_60px_-35px_rgba(15,23,42,0.8)] backdrop-blur-xl">
            <Outlet context={{user, setUser}}/>
          </main>
        </div>
      </div>
    </div>
  );
};
