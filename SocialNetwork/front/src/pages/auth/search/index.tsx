import { useEffect, useState, type FormEvent } from "react";
import { Http } from "../../../config/api";
import type { Account } from "../../../helpers/types";
import { Image } from "../../../components/Image";
import icon from "../../../utils/icon-7797704_640.png";
import { Link } from "react-router-dom";

export const Search = () => {
  const [username, setUsername] = useState("");
  const [results, setResults] = useState<Account[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  useEffect(() => {
      if(!username.trim()){
        setResults([]);
        setError("");
        setHasSearched(false);
        return;
      }
      const id = setTimeout(() => {
        setIsLoading(true);
        setError("");
        setHasSearched(true)
          Http
          .get(`/account/search/${username}`)
          .then((res) => {
            console.log(res.data)
            setResults(res.data.users);
            console.log(results);
          })    
          .catch(err => {
            console.log(err);
            setResults([]);
            setError("User not found");
          })
          .finally(() => {
            setIsLoading(false)
          })
      }, 500)
      return () => clearTimeout(id);
    }, [username])


  return (
    <section className="rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-[0_25px_60px_-35px_rgba(15,23,42,0.8)] backdrop-blur-xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-sky-300/80">
            Search
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-white">
            Find people
          </h1>
        </div>
        <p className="text-sm text-slate-400">
          Search by name or username
        </p>
      </div>

      <form className="mt-8 rounded-[28px] border border-white/10 bg-slate-900/80 p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-slate-500">
              Search
            </span>
            <input
            onChange={(e) => setUsername(e.target.value)}
              type="text"
              value={username}
              placeholder="Type a username..."
              className="w-full rounded-full border border-white/10 bg-slate-950/80 px-5 py-4 pl-24 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/20"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-400 px-7 py-4 text-sm font-semibold text-white shadow-xl shadow-fuchsia-500/20 transition hover:scale-[1.01] hover:brightness-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>

        {error && <p className="mt-4 text-sm text-fuchsia-300">{error}</p>}
      </form>

      {results.length > 0 ? (
        <div className="mt-8 grid gap-4">
          {results.map((user) => (
            <div
              key={user.id}
              className="flex flex-col gap-4 rounded-[28px] border border-white/10 bg-slate-900/80 p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] sm:flex-row sm:items-center"
            >
              <div className="flex min-w-0 flex-1 items-center gap-4">
                <Image
                  src={user.avatar || icon}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="h-14 w-14 shrink-0 rounded-full border border-slate-800 object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate font-semibold text-white">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="mt-1 truncate text-sm text-slate-400">
                    @{user.username}
                  </p>
                </div>
              </div>
              <Link
                to={`/profile/view/${user.username}`}
                className="inline-flex w-full cursor-pointer items-center justify-center rounded-full border border-sky-400/30 bg-sky-400/10 px-5 py-3 text-sm font-semibold text-sky-100 shadow-lg shadow-sky-500/10 transition hover:border-sky-300/60 hover:bg-sky-400/20 hover:text-white hover:shadow-sky-500/20 active:scale-95 sm:w-auto"
              >
                View Profile
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-[28px] border border-dashed border-white/15 bg-slate-900/70 p-8 text-center">
          <p className="mt-3 text-sm leading-7 text-slate-400">
            {hasSearched
              ? "Try another name or username."
              : "Results will appear here after you search for a user."}
          </p>
        </div>
      )}
    </section>
  );
}
