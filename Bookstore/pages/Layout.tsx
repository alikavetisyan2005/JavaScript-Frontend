import { Link, NavLink, Outlet } from "react-router-dom";

const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-4 py-2 text-sm font-medium transition ${
    isActive
      ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
      : "text-slate-200 hover:bg-slate-800 hover:text-white"
  }`;

export const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500 text-base font-bold text-slate-950">
              B
            </div>
            <div>
              <p className="text-lg font-semibold leading-none">Bookstore</p>
              <p className="text-xs text-slate-400">Your next great read</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-4 sm:flex">
            <NavLink to="/" className={navLinkClasses} end>
              Home
            </NavLink>
            <NavLink to="/add" className={navLinkClasses}>
              Add Book
            </NavLink>
            <NavLink
              to="/about"
              className={navLinkClasses}
            >
              Browse
            </NavLink>
          </nav>

          <div className="hidden items-center gap-3 sm:flex">
            <Link
              to="/login"
              className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"
            >
              Login
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};
