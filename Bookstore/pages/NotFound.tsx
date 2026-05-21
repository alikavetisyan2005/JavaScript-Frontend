import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-6 py-16">
      <div className="max-w-3xl text-center">
        <span className="inline-flex rounded-full bg-rose-500/20 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-rose-300">
          404 error
        </span>
        <h1 className="mt-8 text-6xl font-extrabold tracking-tight text-white sm:text-7xl">
          Page not found
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-300">
          Sorry, we couldn’t find the page you’re looking for. It may have been
          moved or deleted, or the URL may be incorrect.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            Back to bookstore
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-slate-700 px-6 py-3 text-base font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"
          >
            Browse books
          </Link>
        </div>
        <div className="mt-12 rounded-3xl border border-slate-800 bg-slate-900/80 p-8 text-left text-slate-400 shadow-xl shadow-slate-950/20 sm:text-base">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
            Need help?
          </p>
          <p className="mt-3 text-sm leading-6">
            If you think this is a mistake, check the URL or head back to the
            bookstore homepage. Your next great read is waiting.
          </p>
        </div>
      </div>
    </main>
  );
};
