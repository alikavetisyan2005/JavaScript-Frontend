import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Products } from "./Products";
import { Axios } from "../utils/api";
import { Product } from "../utils/types";

export const Edit = () => {

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [author, setAuthor] = useState("");
    const [photo, setPhoto] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const {id} = useParams();


    useEffect(() => {
        Axios.get(`http://localhost:4002/products/${id}`)
        .then(res => {
            const book = res.data;
            setTitle(book.title);
            setAuthor(book.author);
            setPrice(book.price);
            setPhoto(book.photo);
        })
        .catch(err => console.log(err))
    }, [])

    const handleCancel = () => {
        navigate("/");
    }

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        if(!title){
            setError("Title is required")
        }
        const updatedBook = {
            title,
            author,
            price,
            photo,
            description,
        }

        Axios.put(`/products/${id}`, updatedBook)
        .then(res => {
            console.log(res.data)
            navigate("/")
        }
    )
        .catch(
            err => console.log(err)
        )
    }


  return (
    <section className="mx-auto max-w-3xl rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/20">
      <div className="mb-8 space-y-3 text-center">
        <p className="inline-flex rounded-full bg-emerald-500/10 px-4 py-1 text-sm font-semibold uppercase tracking-[0.32em] text-emerald-300">
          Edit book
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Update book details
        </h1>
        <p className="mx-auto max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
          Use the fields below to style the edit page and show the input layout.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
            Title
            <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="The Great Gatsby"
              className="rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
            Author
            <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
              type="text"
              placeholder="F. Scott Fitzgerald"
              className="rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </label>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
            Price
            <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
              type="number"
              placeholder="14.99"
              className="rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
            Image URL
            <input
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
              type="text"
              placeholder="https://example.com/book-cover.jpg"
              className="rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </label>
        </div>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
          Description
          <textarea
          value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="A short description about the book..."
            rows={4}
            className="resize-none rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-400">
            Preview the layout before wiring it up.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-8 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Save Changes
            </button>
            <button onClick={handleCancel}
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900 px-8 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};
