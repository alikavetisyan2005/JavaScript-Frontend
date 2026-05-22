import { useOutletContext } from "react-router-dom";
import type { Context } from "../../../helpers/types";

export const AccountDetails = () => {

    const {user} = useOutletContext<Context>();
    return  (
        <section className="rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.9)] backdrop-blur-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400/80">
              Account settings
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              Customize your profile mode
            </h2>
          </div>
          <div className="rounded-full bg-slate-900/80 px-4 py-2 text-sm font-semibold text-slate-200 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
            Current mode:{" "}
            <span className="text-white">
              {user.isAccountPrivate ? "Private" : "Public"}
            </span>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400/80">
              Identity
            </p>
            <h3 className="mt-4 text-xl font-semibold text-white">
              {user.firstName} {user.lastName}
            </h3>
            <p className="mt-2 text-sm text-slate-400">{user.username}</p>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400/80">
              System
            </p>
            <h3 className="mt-4 text-xl font-semibold text-white">Standard</h3>
            <p className="mt-2 text-sm text-slate-400">
              Platform level and account rules.
            </p>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400/80">
              Privacy state
            </p>
            <h3 className="mt-4 text-xl font-semibold text-white">
              {user.isAccountPrivate ? "Private" : "Public"}
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Use the toggle below to switch your account visibility.
            </p>
          </div>
        </div>
      </section>
    )
};
