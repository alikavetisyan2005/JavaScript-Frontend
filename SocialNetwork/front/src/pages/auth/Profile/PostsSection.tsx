import { useOutletContext } from "react-router-dom";
import type { Context, Posts } from "../../../helpers/types";
import { Http } from "../../../config/api";
import { useState } from "react";
import axios from "axios";

const getPostImageSrc = (image?: string) => {
  if (!image) return "";
  if (image.startsWith("http") || image.startsWith("/")) return image;

  return `http://localhost:4002/${image}`;
};
export const PostsSection = () => {
  const { user } = useOutletContext<Context>();
  const posts = user.posts as Posts[];
  const [done, setDone] = useState("");
  const [error, setError] = useState("");

  const handleDelete = (id: number) => {
    Http.delete(`/posts/${id}`)
      .then(() => {setDone("Post deleted successfully")
        refetch();
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          const response = err.response?.data;
          setError(response?.message || "Something went wrong");
        }
      });
  };
  return (
    <section className="rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-[0_25px_60px_-35px_rgba(15,23,42,0.8)] backdrop-blur-xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-sky-300/80">
            Posts
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-white">
            {user.firstName}'s posts
          </h3>
        </div>
        <p className="text-sm text-slate-400">
          {posts.length} {posts.length === 1 ? "post" : "posts"}
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.id}
              className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/80 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] transition hover:border-sky-400/40"
            >
              {post.postImage && (
                <img
                  src={getPostImageSrc(post.postImage)}
                  alt={post.title}
                  className="h-56 w-full object-cover"
                />
              )}

              <div className="p-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h4 className="text-xl font-semibold text-white">
                      {post.title}
                    </h4>
                    {post.location && (
                      <p className="mt-2 text-sm text-sky-300">
                        {post.location}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => handleDelete(post.id)}
                    type="button"
                    className="inline-flex cursor-pointer items-center justify-center rounded-full border border-red-400/30 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-200 shadow-lg shadow-red-950/20 transition hover:border-red-300/60 hover:bg-red-500/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-300/40 active:scale-95"
                  >
                    Delete
                  </button>
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {post.description}
                </p>

                {post.tags?.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs font-medium text-fuchsia-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-[28px] border border-dashed border-white/15 bg-slate-900/70 p-8 text-center">
          <p className="text-lg font-semibold text-white">No posts yet</p>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            Posts from this profile will appear here after they are created.
          </p>
        </div>
      )}
    </section>
  );
};
