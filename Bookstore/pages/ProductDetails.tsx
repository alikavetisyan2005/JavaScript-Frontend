import { useEffect, useState, type MouseEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Product } from "../utils/types";
import { Axios } from "../utils/api";

export const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    Axios.get<Product>(`/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Product not found.");
        setLoading(false);
      });
  }, [id]);

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    Axios.delete(`/products/${id}`)
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="mx-auto max-w-4xl py-6">
      <div className="rounded-3xl bg-slate-900 p-6 shadow-xl shadow-slate-900/40">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-3xl font-semibold text-slate-100">
              Book Details
            </h3>
            <p className="mt-2 text-slate-400">
              A detailed view of the selected book.
            </p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-600"
          >
            Back
          </button>
        </div>

        {loading ? (
          <div className="rounded-2xl bg-slate-800 p-10 text-center text-slate-300">
            Loading product...
          </div>
        ) : error ? (
          <div className="rounded-2xl bg-rose-500/10 border border-rose-400/30 p-8 text-rose-200">
            {error}
          </div>
        ) : product ? (
          <>
            <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
              <div className="overflow-hidden rounded-3xl bg-slate-800">
                {product.photo ? (
                  <img
                    src={product.photo}
                    alt={product.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-80 items-center justify-center bg-slate-700 text-slate-300">
                    No image available
                  </div>
                )}
              </div>

              <div className="rounded-3xl bg-slate-800 p-6 text-slate-100">
                <h4 className="text-2xl font-semibold">{product.title}</h4>
                <p className="mt-2 text-slate-400">by {product.author}</p>
                <div className="mt-4 flex items-center gap-3 rounded-2xl bg-slate-900 px-4 py-3">
                  <span className="text-sm uppercase tracking-[0.2em] text-slate-500">
                    Price
                  </span>
                  <span className="text-3xl font-bold text-emerald-400">
                    {product.price} USD
                  </span>
                </div>
                <div className="mt-6 flex items-center justify-between gap-4 rounded-3xl bg-slate-900 p-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-amber-400 text-xl">
                        ★
                      </span>
                    ))}
                    <span className="ml-3 text-sm text-slate-400">
                      5.0 rating
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      to={`/products/${product.id}/edit`}
                      className="rounded-full bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-600"
                    >
                      Edit Book
                    </Link>
                    <button
                      onClick={handleDelete}
                      className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600"
                    >
                      Delete Book
                    </button>
                  </div>
                </div>

                <div className="mt-6 space-y-4 text-slate-300">
                  <p>
                    This book is a must-read for anyone looking for a timeless
                    classic. The author’s voice and narrative style make it a
                    rich and memorable story.
                  </p>
                  <p className="text-slate-500 text-sm">
                    Product ID: {product.id}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-3xl bg-slate-800 p-6 text-slate-100">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h5 className="text-xl font-semibold">Comments</h5>
                  <p className="text-sm text-slate-400">
                    Share your thoughts and rate the book.
                  </p>
                </div>
                <button
                  type="button"
                  className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-700"
                >
                  Add Comment
                </button>
              </div>

              <form className="mt-6 space-y-6">
                <div className="grid gap-4 sm:grid-cols-3">
                  <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
                    Name
                    <input
                      type="text"
                      name="reviewName"
                      placeholder="Your name"
                      className="rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </label>

                  <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
                    Rating
                    <select
                      name="rating"
                      className="rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    >
                      <option value="5">5 stars</option>
                      <option value="4">4 stars</option>
                      <option value="3">3 stars</option>
                      <option value="2">2 stars</option>
                      <option value="1">1 star</option>
                    </select>
                  </label>

                  <span className="flex items-center rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-400">
                    <span className="font-medium text-slate-100">
                      Select stars
                    </span>
                  </span>
                </div>

                <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
                  Comment
                  <textarea
                    name="reviewText"
                    placeholder="Write your review..."
                    rows={4}
                    className="resize-none rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  />
                </label>

                <div className="flex justify-end">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-8 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
                  >
                    Post Review
                  </button>
                </div>
              </form>

              <div className="mt-8 space-y-4">
                <div className="rounded-3xl bg-slate-900 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-slate-100">Reader1</p>
                    <div className="flex items-center gap-1 text-amber-400">
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>
                  </div>
                  <p className="mt-2 text-slate-300">
                    A wonderful story with unforgettable characters.
                  </p>
                </div>

                <div className="rounded-3xl bg-slate-900 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-slate-100">Reader2</p>
                    <div className="flex items-center gap-1 text-amber-400">
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>
                  </div>
                  <p className="mt-2 text-slate-300">
                    Great pacing and excellent writing.
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};
