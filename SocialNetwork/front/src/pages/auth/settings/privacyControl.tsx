import { useOutletContext } from "react-router-dom";
import { Http } from "../../../config/api";
import type { Context } from "../../../helpers/types";



export const PrivacyControl = () => {
    const {user, setUser} = useOutletContext<Context>();
    
    const handleMakingPublic = () => {
    Http.patch("/account/privacy", {
      isAccountPrivate: false,
    })
      .then((res) => {
        setUser({ ...user, isAccountPrivate: false });
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleMakingPrivate = () => {
    Http.patch("/account/privacy", {
      isAccountPrivate: true,
    })
      .then((res) => {
        setUser({ ...user, isAccountPrivate: true });
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

    return(
        <section className="rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-[0_25px_60px_-35px_rgba(15,23,42,0.8)] backdrop-blur-xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400/80">
              Privacy control
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-white">
              Choose your account visibility
            </h3>
          </div>
          <div className="inline-flex overflow-hidden rounded-full border border-white/10 bg-slate-900/90 shadow-[0_12px_40px_-28px_rgba(56,189,248,0.4)]">
            <button
              className={`px-5 py-3 text-sm font-semibold transition ${
                !user.isAccountPrivate
                  ? "bg-white text-slate-950 shadow-sm shadow-sky-500/20"
                  : "bg-transparent text-slate-300 hover:bg-slate-800"
              }`}
              onClick={handleMakingPublic}
            >
              Public
            </button>
            <button
              onClick={handleMakingPrivate}
              className={`px-5 py-3 text-sm font-semibold transition ${
                user.isAccountPrivate
                  ? "bg-white text-slate-950 shadow-sm shadow-fuchsia-500/20"
                  : "bg-transparent text-slate-300 hover:bg-slate-800"
              }`}
            >
              Private
            </button>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
            <p className="text-sm text-slate-400">Public mode</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Your profile and posts are visible to everyone. This is ideal if
              you want maximum engagement and easier discoverability.
            </p>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
            <p className="text-sm text-slate-400">Private mode</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Only accepted followers can view your profile and posts. Use this
              when you want more control over who sees your content.
            </p>
          </div>
        </div>
      </section>
    )
}