import { Outlet, useNavigate } from "react-router-dom";
import { NavLinks } from "./navLink";
import { useEffect, useState } from "react";
import { Http } from "../../config/api";
import type { Account } from "../../helpers/types";

export const AuthLayout = () => {
  const [user, setUser] = useState<Account | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    Http.get<{ user: Account }>("/auth/user")
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
      });
  }, []);

  
  return (
    user && (
      <div className="relative min-h-screen overflow-hidden bg-[#05060d] text-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(236,72,153,0.18),_transparent_24%)]" />
        <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-4 py-10">
          <div className="flex flex-col gap-6">
            <NavLinks />
            <main className="rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-[0_25px_60px_-35px_rgba(15,23,42,0.8)] backdrop-blur-xl">
              <Outlet context={{ user, setUser }} />
            </main>
          </div>
        </div>
      </div>
    )
  );
};
