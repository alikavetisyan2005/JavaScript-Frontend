import { useEffect, useState } from "react";
import type { Product } from "../utils/types";
import { Axios } from "../utils/api";
import { Link } from "react-router-dom";

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    Axios.get<Product[]>("/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="mx-auto max-w-7xl">
      <h3 className="text-2xl font-semibold mb-6">Products</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-slate-800 rounded-lg p-4 shadow hover:scale-[1.01] transition-transform"
          >
            {product.photo ? (
              <img
                src={product.photo}
                alt={product.title}
                className="w-full h-40 object-cover rounded"
              />
            ) : (
              <div className="w-full h-40 bg-slate-700 rounded flex items-center justify-center text-slate-300">
                No Image
              </div>
            )}

            <h4 className="mt-3 text-lg font-semibold text-slate-100">
              {product.title}
            </h4>
            <p className="text-sm text-slate-400">{product.author}</p>
            <p className="mt-2 font-medium text-emerald-400">
              {product.price} USD
            </p>
            <Link
              to={`/products/${product.id}`}
              className="inline-block mt-3 px-4 py-2 bg-emerald-500 text-slate-900 rounded-md font-semibold text-sm shadow hover:bg-emerald-600 transition-colors"
            >
              Book Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
