import axios from "axios";
import { createContext, useState } from "react";

export const cartContext = createContext();
export default function UserCartContext({ children }) {
  const [allProductsInCart, setAllProductsInCart] = useState(null);
  const [countOfItems, setCountOfItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [cartId, setCartId] = useState(null);

  const headers = { token: localStorage.getItem("token") };

  async function addToCart(id) {
    return await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: id,
        },
        { headers }
      )
      .then((res) => {
        setCountOfItems(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        return true;
      })
      .catch(() => {
        return false;
      });
  }
  function getProductIncart() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", { headers })
      .then((res) => {
        setCountOfItems(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        setCartId(res.data.data._id);
        // console.log(res.data.data._id);

        if (res.data.data.products.length == 0) {
          setAllProductsInCart("nodata");
        } else {
          setAllProductsInCart(res.data.data.products);
        }
      })
      .catch(() => {
        setAllProductsInCart("nodata");
      });
  }

  async function clearUserCart() {
    await axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", { headers })
      .then(() => {
        setAllProductsInCart("nodata");
        setCountOfItems(0);
        setTotalCartPrice(0);
      })
      .catch(() => {
        setAllProductsInCart("nodata");
      });
  }
  async function incrementCountOfProduct(id, count) {
    await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count: count,
        },
        { headers }
      )
      .then((res) => {
        setAllProductsInCart(res.data.data.products);
        setTotalCartPrice(res.data.data.totalCartPrice);
      });
  }
  async function decrementCountOfProduct(id, count) {
    return await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count: count,
        },
        { headers }
      )
      .then((res) => {
        setAllProductsInCart(res.data.data.products);
        setTotalCartPrice(res.data.data.totalCartPrice);

        return true;
      })
      .catch(() => {
        return false;
      });
  }
  async function deleteItemFormCart(id) {
    await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers })
      .then((res) => {
        setTotalCartPrice(res.data.data.totalCartPrice);
        setCountOfItems(res.data.numOfCartItems);

        if (res.data.data.products.length == 0) {
          setAllProductsInCart("nodata");
        } else {
          setAllProductsInCart(res.data.data.products);
        }
        return true;
      })
      .catch((res) => {
        return false;
      });
  }


  // https://ecommerce.routemisr.com/api/v1/wishlist

  return (
    <cartContext.Provider
      value={{
        addToCart,
        allProductsInCart,
        getProductIncart,
        clearUserCart,
        incrementCountOfProduct,
        decrementCountOfProduct,
        deleteItemFormCart,
        countOfItems,
        totalCartPrice,
        cartId,
        setCountOfItems,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
