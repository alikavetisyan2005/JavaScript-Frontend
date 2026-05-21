import { createBrowserRouter } from "react-router-dom";
import { Products } from "../pages/Products";
import { Layout } from "../pages/Layout";
import { AddProducts } from "../pages/AddProducts";
import { ProductDetails } from "../pages/ProductDetails";
import { NotFound } from "../pages/NotFound";
import { Edit } from "../pages/Edit";

export const routes = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "", element: <Products /> },
      { path: "add", element: <AddProducts /> },
      { path: "products/:id", element: <ProductDetails /> },
      {path:"products/:id/edit", element: <Edit/>}
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
