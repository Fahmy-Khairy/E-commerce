import { createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./Component/Layout/Layout";
import Home from "./Component/Home/Home";
import Register from "./Component/Register/Register";
import Login from "./Component/Login/Login";
import Cart from "./Component/Cart/Cart";
import Categories from "./Component/Categories/Categories";
import NotFound from "./Component/NotFound/NotFound";
import Brands from "./Component/Brands/Brands";
import AuthenticatedUser from "./Context/AuthenticatedUser";
import Guard from "./Component/Guard/Guard";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetails from "./Component/ProductDetails/ProductDetails";
import UserCartContext from "./Context/UserCartContext";
import { Toaster } from "react-hot-toast";
import CashPayment from "./Component/CashPayment/CashPayment";
import { Offline } from "react-detect-offline";
import Wishlist from "./Component/Wishlist/Wishlist";
import UserWishlistContext from "./Context/UserWishlistContext";

const router = createHashRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Guard>
            <Home />
          </Guard>
        ),
      },
      {
        path: "Home",
        element: (
          <Guard>
            <Home />
          </Guard>
        ),
      },
      { path: "Register", element: <Register /> },
      { path: "login", element: <Login /> },
      {
        path: "Cart",
        element: (
          <Guard>
            <Cart />
          </Guard>
        ),
      },
      {
        path: "Categories",
        element: (
          <Guard>
            <Categories />
          </Guard>
        ),
      },
      {
        path: "Brands",
        element: (
          <Guard>
            <Brands />
          </Guard>
        ),
      },
      {
        path: "*",
        element: (
          <Guard>
            <NotFound />
          </Guard>
        ),
      },
      {
        path: "ProductDetails/:id",
        element: (
          <Guard>
            <ProductDetails />
          </Guard>
        ),
      },
      {
        path: "CashPayment",
        element: (
          <Guard>
            <CashPayment />
          </Guard>
        ),
      },
      {
        path: "Wishlist",
        element: (
          <Guard>
            <Wishlist />
          </Guard>
        ),
      },
    ],
  },
]);

const reactQueryConifg = new QueryClient();

export default function App() {
  return (
    <AuthenticatedUser>
      <QueryClientProvider client={reactQueryConifg}>
        <UserWishlistContext>
          <UserCartContext>
            <RouterProvider router={router} />
            <Toaster />
            <Offline>
              <div className="p-5 fixed bottom-5 left-5 bg-mainColor text-white rounded-full">
                <h2>You`re Offline</h2>
              </div>
            </Offline>
          </UserCartContext>
        </UserWishlistContext>
      </QueryClientProvider>
    </AuthenticatedUser>
  );
}
