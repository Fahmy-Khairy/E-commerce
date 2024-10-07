import { useContext, useEffect } from "react";
import { wishlistContext } from "./../../Context/UserWishlistContext";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/UserCartContext";
import axios from "axios";
import toast from "react-hot-toast";

export default function Wishlist() {
  const { addToCart } = useContext(cartContext);

  const { getWishlistContent, allProductWishlist } =
    useContext(wishlistContext);
  // console.log(allProductWishlist);
  // https://ecommerce.routemisr.com/api/v1/wishlist/6428de2adc1175abc65ca05b

  function removeElement(id) {
    axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then(() => {
        getWishlistContent();
        toast.success("Removed Successed",{
          position:"top-right",
          duration:3000
        })
      }).catch(()=>{
        toast.error("Removed Successed",{
          position:"top-right",
          duration:3000
        })
      });
  }

  useEffect(() => {
    getWishlistContent();
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-5 md:w-4/5 md:mx-auto">
      <table className="w-full text-sm text-left rtl:text-right ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr className="text-center">
            <th scope="col" className="px-6 py-3">
              Product Image
            </th>
            <th scope="col" className="px-6 py-3 hidden md:table-cell ">
              Product name
            </th>
            <th scope="col" className="px-6 py-3 hidden md:table-cell ">
              Product Category
            </th>
            <th scope="col" className="px-6 py-3 hidden md:table-cell ">
              Product Price
            </th>
            <th scope="col" className="px-6 py-3">
              Details
            </th>
            <th scope="col" className="px-6 py-3">
              Add to Cart
            </th>
            <th scope="col" className="px-6 py-3">
              Remove from Wishlist
            </th>
          </tr>
        </thead>
        <tbody className="divide-y-2">
          {allProductWishlist ? (
            allProductWishlist.data.map((product) => (
              <tr key={product._id} className="bg-white divide-x-2">
                <th scope="row" className="px-6  py-4 ">
                  <img
                    src={product.imageCover}
                    className="w-1/2 mx-auto  block rounded-2xl"
                    alt=""
                  />
                </th>
                <td className="px-6 text-center py-4 font-medium text-gray-900 whitespace-nowrap hidden md:table-cell  ">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </td>
                <td className="px-6 text-center py-4 hidden md:table-cell ">
                  {product.category.name}
                </td>
                <td className="px-6 text-center py-4 hidden md:table-cell ">{product.price}</td>
                <td className="px-6 text-center py-4">
                  <Link to={"/ProductDetails/" + product._id}>
                    <i className="fa-solid fa-eye fa-2x text-blue-500 hover:text-blue-300 duration-500 cursor-pointer"></i>
                  </Link>
                </td>
                <td className="px-6 text-center py-4">
                  <i
                    onClick={() => addToCart(product._id)}
                    className="fa-solid fa-cart-plus text-2xl text-blue-500 hover:text-blue-300 duration-500"
                  ></i>
                </td>
                <td className="px-6 text-center  ">
                  <p className="py-4 text-red-600 hover:text-red-700 cursor-pointer duration-500" onClick={() => removeElement(product._id)}>
                  <i className="fa-solid fa-trash-can text-2xl "></i>
                  </p>
                </td>
              </tr>
            ))
          ) : (
            <Loading />
          )}
        </tbody>
      </table>
    </div>
  );
}
