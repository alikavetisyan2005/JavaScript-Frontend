export const AddProducts = () => {
  return (
    <section className="mx-auto max-w-3xl rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/20">
      <div className="mb-8 space-y-3 text-center">
        <p className="inline-flex rounded-full bg-emerald-500/10 px-4 py-1 text-sm font-semibold uppercase tracking-[0.32em] text-emerald-300">
          New book
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Add a book to your collection
        </h1>
        <p className="mx-auto max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
          Add book details and keep your bookstore inventory fresh.
        </p>
      </div>

      <form className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
            Title
            <input
              type="text"
              placeholder="The Great Gatsby"
              className="rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
            Price
            <input
              type="number"
              placeholder="14.99"
              className="rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </label>
        </div>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
          Image URL
          <input
            type="text"
            placeholder="https://example.com/book-cover.jpg"
            className="rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
          Description
          <textarea
            placeholder="A short description about the book..."
            rows={4}
            className="resize-none rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-400">
              Ready to add your book? Review the details and submit.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-8 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            Add Book
          </button>
        </div>
      </form>
    </section>
  );
};
