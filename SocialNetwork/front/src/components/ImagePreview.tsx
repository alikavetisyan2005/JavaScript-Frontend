import ReactModal from "react-modal";
import { Image } from "./Image";
import React, { useEffect, useState } from "react";
import heart from "../utils/heart-svgrepo-com.svg";
import heart2 from "../utils/heart-svgrepo-com (2).svg";
import type { Posts } from "../helpers/types";
import { Http } from "../config/api";

type Props = {
  handleReject: () => void;
  post: Posts;
};

export const ImagePreview: React.FC<Props> = ({ handleReject, post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);
  const [likes, setLikes] = useState([]);


  useEffect(() => {
    Http.get(`/posts/${post.id}/comments`)
    .then(res => setComments(res.data.comments))
    .catch(err => console.log(err));
  }, [post.id])
  const handleAddComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedComment = comment.trim();
    if (!trimmedComment) return;

    Http.post(`/posts/${post.id}/comments`, trimmedComment)
    .then(res => {console.log(res)})
    .catch(err => console.log(err))


  };

  useEffect(() => {
    if (!post?.id) return;

    Http.get(`/posts/${post.id}`)
      .then((res) => {
        setIsLiked(res.data.reactionStatus);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [post.id]);

  useEffect(() => {
    const likeCount = () => {
      Http.get(`/posts/${post.id}/likes`)
      .then(res => {
        setLikes(res.data.reactions)
        console.log(res.data)  
      } )
      .catch(err => console.log(err))
    }

    likeCount()
 },[post.id])

  const handleLike = (id: number) => {
    Http.post(`/posts/${id}/likes`)
      .then((res) => {
        setIsLiked(res.data.reactionStatus);
      })
      .catch((err) => console.error(err));
  };

  return (
    <ReactModal
      isOpen={true}
      onRequestClose={handleReject}
      overlayClassName="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
      className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[32px] border border-white/10 bg-slate-950/95 p-4 shadow-[0_30px_80px_-45px_rgba(56,189,248,0.55)] outline-none"
    >
      <div className="flex h-full flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Image Preview</h2>
          <button
            onClick={handleReject}
            className="rounded-full border border-white/10 bg-slate-900/80 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-sky-400/40 hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-400/30"
          >
            Close
          </button>
        </div>
        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/80 p-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
          <Image
            src={post.postImage}
            alt="Image preview"
            className="max-h-[58vh] w-full object-contain"
          />
        </div>

        <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => handleLike(post.id)}
              className={`inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition active:scale-95 ${
                isLiked
                  ? "bg-rose-500 text-white shadow-lg shadow-rose-500/20 hover:bg-rose-600"
                  : "border border-slate-300 bg-white text-slate-700 hover:border-rose-300 hover:text-rose-500"
              }`}
            >
              {isLiked ? (
                <img
                  src={heart2}
                  alt="liked"
                  className="h-8 w-8 object-contain"
                />
              ) : (
                <img
                  src={heart}
                  alt="like"
                  className="h-8 w-8 object-contain"
                />
              )}

            <p className=" mx-2 text-sm text-slate-400">{likes.length}</p>
            </button> 
            <p className="text-sm text-slate-400">
              {comments.length} {comments.length === 1 ? "comment" : "comments"}
            </p>
          </div>

          <form
            className="mt-4 flex flex-col gap-3 sm:flex-row"
            onSubmit={handleAddComment}
          >
            <input
              type="text"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Write a comment..."
              className="min-h-11 flex-1 rounded-full border border-white/10 bg-slate-950/80 px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/20"
            />
            <button
              type="submit"
              className="min-h-11 rounded-full bg-sky-400 px-6 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/20 transition hover:bg-sky-300 active:scale-95"
            >
              Comment
            </button>
          </form>

          <div className="mt-4 space-y-3">
            {comments.length ? (
              comments.map((text, index) => (
                <div
                  key={`${text}-${index}`}
                  className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm leading-6 text-slate-300"
                >
                  {text}
                </div>
              ))
            ) : (
              <p className="rounded-2xl border border-dashed border-white/15 bg-slate-950/70 px-4 py-3 text-sm text-slate-500">
                No comments yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </ReactModal>
  );
};
