import { useContext, useEffect } from "react";
import { cartContext } from "../../Context/UserCartContext";
import Loading from "../Loading/Loading";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Cart() {
  const {
    allProductsInCart,
    getProductIncart,
    clearUserCart,
    incrementCountOfProduct,
    decrementCountOfProduct,
    deleteItemFormCart,
    countOfItems,
    totalCartPrice,
  } = useContext(cartContext);
  useEffect(() => {
    getProductIncart();
  }, []);
  const navigate = useNavigate();
  function clearCart() {
    clearUserCart();
  }
  function getProductDetails(id) {
    navigate("/productDetails/" + id);
  }
  async function incrementCount(id, count) {
    let newCount = (count += 1);
    await incrementCountOfProduct(id, newCount);
  }
  async function decrementCount(id, count) {
    let newCount = (count -= 1);
    // await decrementCountOfProduct(id, newCount)
    const resFlag = await decrementCountOfProduct(id, newCount);
    if (resFlag) {
      // flag
      toast.success("Product is Decremented", {
        position: "top-right",
        duration: 3000,
      });
    } else {
      toast.error("Error Decremented Product", {
        position: "top-right",
        duration: 3000,
      });
    }
  }

  async function deleteProduct(id) {
    const resFlag = await deleteItemFormCart(id);
    if (resFlag) {
      // flag
      toast.success("Product is Adding", {
        position: "top-right",
        duration: 3000,
      });
    } else {
      toast.error("Error Adding Product", {
        position: "top-right",
        duration: 3000,
      });
    }
  }

  return (
    <>
      {allProductsInCart ? (
        <div className="container md:w-4/5 md:mx-auto py-7 divide-y-4">
          {allProductsInCart == "nodata" ? (
            <h2 className="font-bold text-5xl">
              Your Cart is Empty : To Add in Cart Go To{" "}
              <Link to={"/home"} className="text-mainColor text-3xl">
                {" "}
                Home...{" "}
              </Link>
            </h2>
          ) : (
            <>
              <div className="md:flex justify-between p-3 items-center space-y-2 ">
                <p className="font-semibold">
                  Total Price in Your cart :{" "}
                  <span className="text-mainColor">{totalCartPrice}</span> EGP
                </p>
                <p className="font-semibold">
                  Total Item in Cart : {countOfItems}{" "}
                </p>
                <Link to={"/CashPayment"}>
                  <button className="bg-mainColor py-2 px-4 rounded-2xl hover:bg-green-700 duration-500 text-white">
                    Priced to Buy
                  </button>
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-5">
                {allProductsInCart.map((product) => (
                  <div key={product.product._id}>
                    <img
                      src={product.product?.imageCover}
                      className="w-full"
                      alt={product.product.title}
                    />
                    <h2 className="text-center text-xl font-bold">
                      {product.product.title.split(" ").splice(0, 2).join(" ")}
                    </h2>
                    <p className="text-xl">Price : {product.price}</p>
                    <div>
                      <button
                        onClick={() => {
                          product.count > 1
                            ? decrementCount(product.product._id, product.count)
                            : deleteProduct(product.product._id);
                        }}
                        className="p-2 bg-mainColor hover:bg-green-700 duration-500 rounded-lg w-7 text-white "
                      >
                        {product.count > 1 ? (
                          <i>-</i>
                        ) : (
                          <i className="fa-solid fa-trash"></i>
                        )}
                      </button>
                      <span className="bg-gray-500 border-2 py-2 px-1 text-sm font-semibold rounded-xl text-white">
                        {product.count}
                      </span>
                      <button
                        onClick={() => {
                          incrementCount(product.product._id, product.count);
                        }}
                        className="p-2 bg-mainColor hover:bg-green-700 duration-500 rounded-lg w-7 text-white "
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => getProductDetails(product.product._id)}
                      className="w-full bg-mainColor hover:bg-green-700 duration-500 mt-2 py-2 px-4 rounded-3xl text-white"
                    >
                      Details..
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex justify-center py-5">
                <button
                  onClick={clearCart}
                  className="bg-red-500 hover:bg-red-700 duration-500 text-white py-2 px-4 rounded-2xl "
                >
                  Clear Cart
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
