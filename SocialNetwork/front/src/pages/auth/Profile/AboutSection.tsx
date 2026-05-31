import { Link, useOutletContext } from "react-router-dom"
import type { Context } from "../../../helpers/types"
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Http } from "../../../config/api";
import { AddPost } from "./AddPost";

export const AboutSection = () => {

  const [showAddPost, setShowAddPost] = useState(false);
  const addPostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (showAddPost) {
      addPostRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [showAddPost]);

    const {user} = useOutletContext<Context>();
      const [bio, setBio] = useState(user.bio || "No bio available yet.") 
      
        const handleBioChange = (e: FormEvent<HTMLHeadingElement>) => {
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
      <>
        <section className="rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-[0_25px_60px_-35px_rgba(15,23,42,0.8)] backdrop-blur-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400/80">
              About me
            </p>
            <h3 contentEditable suppressContentEditableWarning className="mt-3 text-xs font-semibold text-white" onBlur={handleBioChange}>
              {bio}
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
              <button onClick={() => showAddPost ? setShowAddPost(false) : setShowAddPost(true)} className="rounded-full bg-gradient-to-r from-sky-500 via-violet-500 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white transition hover:brightness-105">
                Create new post
              </button>
              <Link to={"followers"} className="rounded-full border border-white/10 bg-slate-950/80 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-900">
                Manage followers
              </Link>
            </div>
          </div>
        </div>
      </section>
      {showAddPost && (
        <div ref={addPostRef}>
          <AddPost/>
        </div>
      )}
      </>
    )
}
