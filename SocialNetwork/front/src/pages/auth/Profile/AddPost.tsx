import { useForm, type SubmitHandler } from "react-hook-form"
import { Http } from "../../../config/api";
import { useState } from "react";
import axios from "axios";

type PostForm = {
    title: string,
    description: string,
    location: string,
    tags: string,
    image: FileList

}

export const AddPost = () => {

    const [error, setError] = useState("");
    const {register, handleSubmit, formState: {errors}, reset} = useForm<PostForm>();
    const [done, setDone] = useState("");

    const handlePosting:SubmitHandler<PostForm> = async (data) => {


        try{
            const formData = new FormData();

            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("location", data.location);

            if(data.image?.[0]){
                formData.append("image", data.image[0])
            }

            const res = await Http.post("/posts", formData);
            setDone("Post created successfully");
            setError("");
            reset();
            console.log(res.data);
        }
        catch(err){
            if(axios.isAxiosError(err)){
                setError(err.response?.data?.message || "Something went wrong");
            }
        }
    }

    return (

        <section className="rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-[0_25px_60px_-35px_rgba(15,23,42,0.8)] backdrop-blur-xl">
            <form
            onSubmit={handleSubmit(handlePosting)}
      className="rounded-[32px] border border-white/10 bg-slate-950/80 p-8">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-sky-300/80">
                  New post
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-white">
                  Share something
                </h3>
                {error && <p className="text-red-400">{error}</p>}
                {done && <p className="text-green-400">{done}</p>}
                {errors.description && <p className="text-red-400">{errors.description.message}</p>}
                {errors.title && <p className="text-red-400">{errors.title.message}</p>}
                {errors.image && <p className="text-red-400">{errors.image.message}</p>}

              </div>
              <button
                type="submit"
                className="inline-flex cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-400 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-fuchsia-500/20 transition hover:scale-[1.01] hover:brightness-105 active:scale-95"
                >
                Publish
              </button>
            </div>
    
            <div className="mt-8 space-y-4">
              <input
              {...register("title", {required: "Please fill the title"})}
              type="text"
              placeholder="Post title"
              className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-5 py-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-fuchsia-400/60 focus:ring-2 focus:ring-fuchsia-400/20"
              />
    
              <textarea
                placeholder="What do you want to share?"
                {...register("description", {required: "Please fill the description"})}
                rows={5}
                className="w-full resize-none rounded-[28px] border border-white/10 bg-slate-900/80 px-5 py-4 text-sm leading-7 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/20"
                />
    
              <div className="grid gap-4 lg:grid-cols-[1fr_1fr_auto]">
                <input
                  type="text"
                  {...register("location")}
                  placeholder="Location"
                  className="rounded-3xl border border-white/10 bg-slate-900/80 px-5 py-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-400/20"
                  />
                <input
                  type="text"
                  {...register("tags")}
                  placeholder="Tags"
                  className="rounded-3xl border border-white/10 bg-slate-900/80 px-5 py-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-400/20"
                  />
                <label className="inline-flex cursor-pointer items-center justify-center rounded-3xl border border-dashed border-white/20 bg-slate-900/80 px-5 py-4 text-sm font-semibold text-slate-200 transition hover:border-sky-400/60 hover:text-white">
                  Add image
                  <input
                  {...register("image", {required: "Please send the image file"})} 
                  type="file" accept="image/*" className="hidden" />
                </label>
              </div>
            </div>
                  </form>
          </section>
          
    )
}