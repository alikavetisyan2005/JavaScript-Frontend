import { NavLink } from "react-router-dom"

const navLinkBase =
  "inline-flex items-center justify-center rounded-3xl border border-white/10 bg-slate-900/75 px-4 py-3 text-sm font-semibold text-slate-100 transition duration-200 hover:border-sky-400/30 hover:bg-slate-800/90 hover:text-white";
const navLinkActive =
  "border-transparent bg-gradient-to-r from-sky-500/20 via-violet-500/20 to-fuchsia-500/20 text-white shadow-[0_20px_60px_-35px_rgba(59,130,246,0.35)] ring-1 ring-sky-400/20 backdrop-brightness-110";
export const NavLinks = () => {
    return(
        <aside className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-[0_25px_60px_-35px_rgba(15,23,42,0.8)] backdrop-blur-xl">
            <div className="mb-6 overflow-hidden rounded-[28px] border border-slate-800 bg-slate-900/80 p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400/80">
                Navigation
              </p>
            </div>
            <nav className="grid gap-3">
              <NavLink
                to={"/profile"}
                end
                className={({ isActive }) =>
                  `${navLinkBase} ${isActive ? navLinkActive : ""}`
                }
              >
                Profile
              </NavLink>
              <NavLink
                to={"/profile/settings"}
                className={({ isActive }) =>
                  `${navLinkBase} ${isActive ? navLinkActive : ""}`
                }
              >
                Settings
              </NavLink>
              <NavLink
                to={"/profile/followers"}
                className={({ isActive }) =>
                  `${navLinkBase} ${isActive ? navLinkActive : ""}`
                }
              >
                Followers
              </NavLink>
              <NavLink
                to={"/profile/followings"}
                className={({ isActive }) =>
                  `${navLinkBase} ${isActive ? navLinkActive : ""}`
                }
              >
                Followings
              </NavLink>
              <NavLink
                to={"/profile/messages"}
                className={({ isActive }) =>
                  `${navLinkBase} ${isActive ? navLinkActive : ""}`
                }
              >
                Messages
              </NavLink>
              <NavLink
                to={"/profile/posts"}
                className={({ isActive }) =>
                  `${navLinkBase} ${isActive ? navLinkActive : ""}`
                }
              >
                Posts
              </NavLink>
            </nav>
          </aside>
    )
}