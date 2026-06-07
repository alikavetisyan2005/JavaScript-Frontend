import { useEffect, useState } from "react";

import { Http } from "../../../config/api";
import type { Account, Context, ReturnValue } from "../../../helpers/types";
import { Link, useOutletContext } from "react-router-dom";
import { icon } from "../../../helpers/constants";
import { Image } from "../../../components/Image";
import { Request } from "./components/Requests";


interface Follower {
  sender: Account;
}

export const Followers = () => {
  const { user } = useOutletContext<Context>();
  const username = user.username;
  
  const [followers, setFollowers] = useState<Follower[]>([]);




  useEffect(() => {
    if (!username) return;

    Http.get(`/account/${username}`)
      .then((res) => {
        setFollowers(res.data.user.followers);
      })
      .catch((err) => console.log(err));
  }, [username]);

 
  return (
    <section className="space-y-6">
      {user.isAccountPrivate && <Request/>}
        <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-[0_35px_120px_-60px_rgba(15,23,42,0.9)] backdrop-blur-xl">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-sky-300/80">
              Followers
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-white">
              Followers ({followers.length})
            </h1>
          </div>
          <p className="text-sm text-slate-400">
            People who follow your profile
          </p>
        </div>

        {followers.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-700/80 bg-slate-900/80 px-5 py-10 text-center text-slate-400">
            No followers yet
          </div>
        ) : (
          <div className="grid gap-4">
            {followers.map((follower) => (
              <div
                key={follower.sender.id}
                className="flex flex-col gap-4 rounded-[28px] border border-white/10 bg-slate-900/90 p-4 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.8)] sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <Image
                  src={
                      follower.sender.avatar || icon
                    }
                    alt={follower.sender.username}
                    className="h-14 w-14 rounded-full object-cover ring-1 ring-white/10"
                    />

                  <div>
                    <p className="text-lg font-semibold text-white">
                      {follower.sender.firstName} {follower.sender.lastName}
                    </p>
                    <p className="text-sm text-slate-400">
                      @{follower.sender.username}
                    </p>
                  </div>
                </div>

                <Link
                to={`/profile/view/${follower.sender.username}`} 
                className="inline-flex min-h-12 w-full cursor-pointer items-center justify-center rounded-full border px-7 py-3 text-sm font-semibold shadow-xl transition duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 sm:w-fit"
                >View Profile</Link>

                
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
