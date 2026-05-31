import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Http } from "../../../config/api";
import type { Account } from "../../../helpers/types";
import { Image } from "../../../components/Image";
import icon from "../../../utils/icon-7797704_640.png";

export const UserPage = () => {
    const {username} = useParams();

    const [user, setUser] = useState<Account | null>(null);
    const [data, setData] = useState();
    const [error, setError] = useState("");

    useEffect(() => {
        Http.get(`/account/${username}`)
        .then((res) => {
            setData(res.data);
            console.log(res.data)
            setUser(res.data.user)
        })
        .catch(err => {
            setError("Something went wrong")
        })
    }, [username])

    const handleFollow = () => {

    }
    return (
        <div className="space-y-8">
            <section className="overflow-hidden rounded-[32px] border border-white/10 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.85)] backdrop-blur-xl">
                <div className="h-32" />

                <div className="px-8 pb-8">
                    <div className="-mt-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
                            <Image
                                src={user?.avatar || icon}
                                alt={`${user?.firstName || "User"} ${user?.lastName || "profile"}`}
                                className="h-28 w-28 rounded-full border-4 border-slate-950 bg-slate-900 object-cover shadow-xl shadow-sky-500/10"
                            />

                            <div className="pb-1">
                                <p className="text-xs uppercase tracking-[0.35em] text-sky-300/80">
                                    Profile
                                </p>
                                <h1 className="mt-3 text-3xl font-semibold text-white">
                                    {user
                                        ? `${user.firstName} ${user.lastName}`
                                        : `User ${username || ""}`}
                                </h1>
                                <p className="mt-2 text-sm text-slate-400">
                                    @{user?.username || username}
                                </p>
                            </div>
                        </div>

                        <button onClick={handleFollow} className="inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-400 px-7 py-3 text-sm font-semibold text-white shadow-xl shadow-fuchsia-500/20 transition hover:scale-[1.01] hover:brightness-105 active:scale-95 sm:w-fit">
                            {user?.isAccountPrivate ? "Send Request" : "Follow"}
                            

                        </button>
                    </div>

                    {error && (
                        <p className="mt-6 rounded-2xl border border-fuchsia-400/20 bg-fuchsia-500/10 px-4 py-3 text-sm text-fuchsia-200">
                            {error}
                        </p>
                    )}

                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                        <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-5 text-center shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
                            <p className="text-sm text-slate-400">Followers</p>
                            <p className="mt-4 text-3xl font-semibold text-white">
                                {user?.followers?.length ?? 0}
                            </p>
                        </div>
                        <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-5 text-center shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
                            <p className="text-sm text-slate-400">Followings</p>
                            <p className="mt-4 text-3xl font-semibold text-white">
                                {user?.followings?.length ?? 0}
                            </p>
                        </div>
                        <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-5 text-center shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
                            <p className="text-sm text-slate-400">Posts</p>
                            <p className="mt-4 text-3xl font-semibold text-white">
                                {user?.posts?.length ?? 0}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-[0_25px_60px_-35px_rgba(15,23,42,0.8)] backdrop-blur-xl">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="max-w-2xl">
                        <p className="text-xs uppercase tracking-[0.35em] text-slate-400/80">
                            About
                        </p>
                        <p className="mt-4 text-sm leading-7 text-slate-300">
                            {user?.bio || "No bio available yet."}
                        </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 lg:w-80 lg:grid-cols-1">
                        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-4 text-sm text-slate-300">
                            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                                Username
                            </p>
                            <p className="mt-3 truncate text-base font-semibold text-white">
                                @{user?.username || username}
                            </p>
                        </div>
                        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-4 text-sm text-slate-300">
                            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                                System
                            </p>
                            <p className="mt-3 text-base font-semibold text-white">
                                {user?.system || "Standard"}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-[0_25px_60px_-35px_rgba(15,23,42,0.8)] backdrop-blur-xl">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-sky-300/80">
                            Posts
                        </p>
                        <h2 className="mt-3 text-2xl font-semibold text-white">
                            {user?.firstName ? `${user.firstName}'s posts` : "User posts"}
                        </h2>
                    </div>
                    <p className="text-sm text-slate-400">
                        {user?.posts?.length ?? 0} posts
                    </p>
                </div>

                {/* <div className="mt-8 rounded-[28px] border border-dashed border-white/15 bg-slate-900/70 p-8">
    {/* {user?.posts?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {user?.posts?.map((post) => {
    console.log(post.postImage);
    const imageUrl = `http://localhost:4002/public/uploads/${post.postImage}`;
    console.log(imageUrl)

    return (
        <img
            key={post.id}
            src={`http://localhost:4002/public/uploads/${post.postImage}`}
            alt="Post"
            className="w-full"
        />
    );
})}
        </div>
    ) : (
        <p className="text-center text-slate-400">
            No posts to show
        </p>
    )}
</div> */}
            </section>
        </div>
    )
}
