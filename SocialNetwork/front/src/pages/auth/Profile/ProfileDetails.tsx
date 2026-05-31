import { Link, useOutletContext } from "react-router-dom";
import type { Context } from "../../../helpers/types";
import icon from "../../../utils/icon-7797704_640.png";
import { Image } from "../../../components/Image";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { Http } from "../../../config/api";

export const ProfileDetails = () => {
  const { user, setUser } = useOutletContext<Context>();
  const [error, setError] = useState("");

  const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return setError("Something went wrong...");

    setError("");

    try {
      const formData = new FormData();
      formData.append("profile-pic", file);

      const res = await Http.patch("/account/avatar", formData);
      const {picture} = res.data;
      console.log(res.data);
      console.log(user.avatar);
      setUser({ ...user, avatar: picture });
    } catch (err) {
      console.log(err);
      setError("something went wrong...");
    }
  };

  return (
    <section className="rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.85)] backdrop-blur-xl">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-5">
          <div className="relative">
            <Image
              src={user.avatar || icon}
              alt={`${user.firstName} ${user.lastName}`}
              className="h-28 w-28 rounded-full border-2 border-slate-800 object-cover shadow-xl shadow-sky-500/10"
            />

            <input
              onChange={handleAvatarChange}
              id="avatar-upload"
              type="file"
              accept="image/*"
              aria-label="Change avatar"
              className="hidden"
            />
            <label
              htmlFor="avatar-upload"
              className="absolute -bottom-1 -right-1 inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 via-violet-500 to-sky-400 text-lg font-semibold leading-none text-white ring-2 ring-slate-950 shadow-lg shadow-fuchsia-500/30 transition hover:scale-105 focus-within:outline-none focus-within:ring-2 focus-within:ring-fuchsia-300 active:scale-95"
            >
              +
            </label>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-sky-300/80">
              My profile
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              {user.firstName} {user.lastName}
            </h2>
            <p className="mt-2 text-sm text-slate-400">@{user.username}</p>
            {error && <p className="mt-2 text-xs text-fuchsia-300">{error}</p>}
          </div>
        </div>

        <Link
          to={"settings"}
          className="cursor-pointer inline-flex items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-400 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-fuchsia-500/20 transition hover:scale-[1.01]"
        >
          Edit profile
        </Link>
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
  );
};
