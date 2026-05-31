import { NavLink, useNavigate } from "react-router-dom";
import logout from "../../utils/login-svgrepo-com.svg"
import profile from "../../utils/profile-1335-svgrepo-com.svg"
import settings from "../../utils/settings-svgrepo-com.svg"
import followings from "../../utils/user-follow-svgrepo-com.svg"
import followers from "../../utils/users-svgrepo-com.svg"
import chats from "../../utils/messages-2-svgrepo-com.svg";
import search from "../../utils/search-sm-svgrepo-com.svg";



const navLinkBase =
"inline-flex items-center justify-center rounded-3xl border border-white/10 bg-slate-900/75 px-4 py-3 text-sm font-semibold text-slate-100 transition duration-200 hover:border-sky-400/30 hover:bg-slate-800/90 hover:text-white";
const navLinkActive =
"border-transparent bg-gradient-to-r from-sky-500/20 via-violet-500/20 to-fuchsia-500/20 text-white shadow-[0_20px_60px_-35px_rgba(59,130,246,0.35)] ring-1 ring-sky-400/20 backdrop-brightness-110";
export const NavLinks = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
      localStorage.removeItem("auth_token");
      navigate("/");
    };
  return (
    <div className="overflow-x-auto rounded-[32px] border border-white/10 bg-slate-950/80 p-4 shadow-[0_25px_60px_-35px_rgba(15,23,42,0.8)] backdrop-blur-xl">
      <div className="mb-4 overflow-hidden rounded-[28px] border border-slate-800 bg-slate-900/80 p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-400/80">
          Navigation
        </p>
      </div>
      <nav className="flex flex-wrap items-center gap-5">
        <NavLink
          to={"/profile"}
          end
          className={({ isActive }) =>
            `${navLinkBase} ${isActive ? navLinkActive : ""}`
          }
        >

          Profile
          <img src={profile} alt="Profile icon" 
          className="h-4 w-4 object-contain brightness-0 invert mx-2"
          />
        </NavLink>
        <NavLink
          to={"/profile/settings"}
          className={({ isActive }) =>
            `${navLinkBase} ${isActive ? navLinkActive : ""}`
          }
        >
          Settings
          <img src={settings} alt="settings icon" 
          className="h-5 w-5 object-contain brightness-0 invert mx-2"
          />
        </NavLink>
        <NavLink
          to={"/profile/followers"}
          className={({ isActive }) =>
            `${navLinkBase} ${isActive ? navLinkActive : ""}`
          }
        >
          Followers
          <img src={followers} alt="Followers icon" 
          className="h-5 w-5 object-contain brightness-0 invert mx-2"
          />
        </NavLink>
        <NavLink
          to={"/profile/followings"}
          className={({ isActive }) =>
            `${navLinkBase} ${isActive ? navLinkActive : ""}`
          }
        >
          Followings
          <img src={followings} alt="followings icon" 
          className="h-5 w-5 object-contain brightness-0 invert mx-2"/>
        </NavLink>
        <NavLink
          to={"/profile/messages"}
          className={({ isActive }) =>
            `${navLinkBase} ${isActive ? navLinkActive : ""}`
          }
        >
          Messages
          <img src={chats} alt="Messages icon" 
          className="h-5 w-5 object-contain brightness-0 invert mx-2"
          />
        </NavLink>
        <NavLink
          to={"/profile/search"}
          className={({ isActive }) =>
            `${navLinkBase} ${isActive ? navLinkActive : ""}`
          }
        >
          Search
          <img src={search} alt="search icon" 
          className="h-5 w-5 object-contain brightness-0 invert mx-2"
          />
        </NavLink>

        <button
                onClick={handleLogout}
                className="ml-auto cursor-pointer inline-flex items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-400 px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-fuchsia-500/20 transition hover:scale-[1.01]"
              >
                <img src={logout} alt="Logout icon" 
                className="h-5 w-5 object-contain brightness-0 invert mx-2"/>
                Logout
              </button>
      </nav>
    </div>
  );
};
