import { useOutletContext } from "react-router-dom";
import type { Context } from "../../../helpers/types";
import { Http } from "../../../config/api";
import type React from "react";
import { useState } from "react";
import avatarImage from "../../../897dd2be-3de6-4071-ba41-0dc10ff3b2f8 (1).jpg"

export const Profile = () => {
  const { user } = useOutletContext<Context>();

  const [bio, setBio] = useState(user.bio || "No bio available yet.") 
  
  const avatarSrc =
    user.avatar ||
    avatarImage;


    const handleBioChange = (e:React.FormEvent<HTMLHeadingElement>) => {
        const updatedBio = e.currentTarget.textContent || "";



        setBio(updatedBio)
        Http.
        patch("account/bio", {
            bio: updatedBio
        })
        .then(res => console.log(res.data))
        .catch(err => console.log(err))

    }


  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.85)] backdrop-blur-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={avatarSrc}
                alt={`${user.firstName} ${user.lastName}`}
                className="h-28 w-28 rounded-full border-2 border-slate-800 object-cover shadow-xl shadow-sky-500/10"
              />
              <span className="absolute -bottom-1 -right-1 inline-flex h-5 w-5 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-sky-300/80">
                My profile
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white">
                {user.firstName} {user.lastName}
              </h2>
              <p className="mt-2 text-sm text-slate-400">@{user.username}</p>
            </div>
          </div>

          <button className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-400 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-fuchsia-500/20 transition hover:scale-[1.01]">
            Edit profile
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-5 text-center shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
            <p className="text-sm text-slate-400">Followers</p>
            <p className="mt-4 text-3xl font-semibold text-white">
              {user.followers?.length ?? 0}
            </p>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-5 text-center shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
            <p className="text-sm text-slate-400">Followings</p>
            <p className="mt-4 text-3xl font-semibold text-white">
              {user.followings?.length ?? 0}
            </p>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-5 text-center shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
            <p className="text-sm text-slate-400">Posts</p>
            <p className="mt-4 text-3xl font-semibold text-white">
              {user.posts?.length ?? 0}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-[0_25px_60px_-35px_rgba(15,23,42,0.8)] backdrop-blur-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400/80">
              About me
            </p>
            <h3 contentEditable suppressContentEditableWarning className="mt-3 text-xs font-semibold text-white" onBlur={handleBioChange}>
              {user.bio || "No bio available yet."}
            </h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-3xl bg-slate-900/80 p-4 text-sm text-slate-300">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                Privacy
              </p>
              <p className="mt-3 text-base font-semibold text-white">
                {user.isAccountPrivate ? "Private" : "Public"}
              </p>
            </div>
            <div className="rounded-3xl bg-slate-900/80 p-4 text-sm text-slate-300">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                System
              </p>
              <p className="mt-3 text-base font-semibold text-white">
                {user.system || "Standard"}
              </p>
            </div>
            <div className="rounded-3xl bg-slate-900/80 p-4 text-sm text-slate-300">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                Username
              </p>
              <p className="mt-3 text-base font-semibold text-white">
                {user.username}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <div className="rounded-[28px] border border-white/10 bg-slate-900/85 p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
            <p className="text-sm text-slate-400">Recent activity</p>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Your latest updates will appear here once you start posting and
              engaging with the network.
            </p>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-slate-900/85 p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
            <p className="text-sm text-slate-400">Quick actions</p>
            <div className="mt-4 flex flex-col gap-3">
              <button className="rounded-full bg-gradient-to-r from-sky-500 via-violet-500 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white transition hover:brightness-105">
                Create new post
              </button>
              <button className="rounded-full border border-white/10 bg-slate-950/80 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-900">
                Manage followers
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
