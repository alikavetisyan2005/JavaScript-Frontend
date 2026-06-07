import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Http } from "../../../config/api";
import type { Account, Posts, ReturnValue } from "../../../helpers/types";
import { Image } from "../../../components/Image";
import { icon } from "../../../helpers/constants";
import lock from "../../../utils/lock-svgrepo-com.svg";
import { ImagePreview } from "../../../components/ImagePreview";



export const UserPage = () => {
  const { username } = useParams();

  const [user, setUser] = useState<Account | null>(null);
  const [response, setResponse] = useState<ReturnValue | null>(null);
  const [imagePreview, setImagePreview] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Posts | null>(null);

  const [error, setError] = useState("");


  useEffect(() => {
    Http.get(`/account/${username}`)
      .then((res) => {
        console.log(res.data);
        setResponse(res.data);
        setUser(res.data.user);
      })
      .catch(() => {
        setError("Something went wrong");
      });
  }, [username]);

  const handleFollow = (id: number) => {
    Http.post(`/follow/${id}`)
    .then(res => {if (res.data.status === "Unfollowed") {
      setResponse(prev =>
        prev
          ? {
              ...prev,
              followStatus: false,
            }
          : prev
      );
    }

    if (res.data.status === "Followed") {
      setResponse(prev =>
        prev
          ? {
              ...prev,
              followStatus: true,
            }
          : prev
        );
      }})
      .catch(err => console.log(err))
    };
    
  const followButtonLabel = response?.followStatus
  ? "Unfollow"
  : response?.followsMe
  ? "Follow Back"
  : response?.requestSent
  ? "Cancel Request"
  : "Follow";
  
  const followButtonClass = response?.followStatus
  ? "border-rose-300/30 bg-rose-500/10 text-rose-100 shadow-rose-950/20 hover:border-rose-300/50 hover:bg-rose-500/20"
  : response?.requestSent
  ? "border-amber-300/30 bg-amber-300/10 text-amber-100 shadow-amber-950/20 hover:border-amber-300/50 hover:bg-amber-300/20"
  : "border-sky-300/30 bg-sky-400 text-slate-950 shadow-sky-500/25 hover:border-sky-200 hover:bg-sky-300";
  
  
  const handleReject = () => {
    setImagePreview(false);
  }
  

  return user &&  (
    <div className="space-y-8">
        {imagePreview && <ImagePreview handleReject={handleReject} post={selectedPost}/>}
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

            <button
              onClick={() => handleFollow(user.id)}
              className={`inline-flex min-h-12 w-full cursor-pointer items-center justify-center rounded-full border px-7 py-3 text-sm font-semibold shadow-xl transition duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 sm:w-fit ${followButtonClass}`}
              >

              {/* {user?.isAccountPrivate ? "Send Request" : "Follow"} */}
              {followButtonLabel}
              
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

        <div className="mt-8 rounded-[28px] border border-white/10 bg-slate-900/70 p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] sm:p-6">
          {user.isAccountPrivate ? (
            <div className="flex min-h-80 flex-col items-center justify-center rounded-[24px] border border-dashed border-sky-300/20 bg-slate-950/70 px-6 py-14 text-center">
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-sky-300/30 bg-sky-300/10 shadow-2xl shadow-sky-500/10">
                <div className="absolute inset-2 rounded-full border border-white/10 bg-slate-900/80" />
                <img
                  src={lock}
                  alt="Locked profile"
                  className="relative h-8 w-8 object-contain brightness-0 invert"
                  />
              </div>
              <h3 className="mt-7 text-2xl font-semibold text-white">
                This account is private
              </h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
                Follow this account to see their photos and posts.
              </p>
            </div>
          ) : user?.posts?.length ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

              {user?.posts?.map((post: Posts) => {
                return (
                  <article
                   onClick={() => {setImagePreview(true) 
                    setSelectedPost(post)
                   }}

                  key={post.id}
                  className="group overflow-hidden rounded-[24px] border border-white/10 bg-slate-950/80 shadow-xl shadow-slate-950/20 transition hover:-translate-y-1 hover:border-sky-300/30 hover:shadow-sky-500/10"
                  >
                    <Image
                      
                      src={post.postImage}
                      alt="Post"
                      className="aspect-square w-full bg-slate-900 object-cover transition duration-300 group-hover:scale-[1.03]"
                    />

                    <div className="space-y-4 p-5">
                      <div>
                        <h3 className="line-clamp-2 text-lg font-semibold leading-6 text-white">
                          {post.title}
                        </h3>
                        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">
                          {post.description}
                        </p>
                      </div>

                      {post.location && (
                        <div className="inline-flex max-w-full items-center rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-1 text-xs font-medium text-sky-100">
                          <span className="truncate">{post.location}</span>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-slate-400">No posts to show</p>
          )}
        </div>
      </section>
    </div>
  );
};
