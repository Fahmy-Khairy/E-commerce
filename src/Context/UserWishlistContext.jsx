import axios from "axios";
import { createContext, useState } from "react";

export const wishlistContext = createContext();
export default function UserWishlistContext({ children }) {
  const [countOfWishlist, setCountOfWishlist] = useState(0);
  const [allProductWishlist, setAllProductWishlist] = useState(null);
  async function addProductToWishlist(id) {
   return axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId: id },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setCountOfWishlist(res.data.data.length);
        return true;
      })
      .catch(() => {
        return false;
      });
  }

  async function getWishlistContent() {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    setAllProductWishlist(data);
    setCountOfWishlist(data.count);
  }

  return (
    <wishlistContext.Provider
      value={{
        addProductToWishlist,
        getWishlistContent,
        countOfWishlist,
        allProductWishlist,
      }}
    >
      {children}
    </wishlistContext.Provider>
  );
}
