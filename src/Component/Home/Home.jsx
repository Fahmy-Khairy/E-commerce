import axios from "axios";
import HomeSlider from "../HomeSlider/HomeSlider";
import img1 from "../../assets/images/blog-img-1.jpeg";
import img2 from "../../assets/images/blog-img-2.jpeg";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { cartContext } from "../../Context/UserCartContext";
import toast from "react-hot-toast";
import { wishlistContext } from "../../Context/UserWishlistContext";

export default function Home() {
  const { addToCart } = useContext(cartContext);
  const { addProductToWishlist } = useContext(wishlistContext);
  function getAllDataOHome() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  const { data, isError, isLoading } = useQuery({
    queryKey: "allProducts",
    queryFn: getAllDataOHome,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  async function clicked(id) {
    const resFlag = await addProductToWishlist(id);
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

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return (
      <>
        <h2>Have Error</h2>
      </>
    );
  }
  async function addProductToCart(id) {
    const resFlag = await addToCart(id);
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
      <div className="lg:w-4/5 mx-auto py-5">
        <div className="md:flex ">
          <div className="md:w-3/4 ">
            <HomeSlider />
          </div>
          <div className="md:w-1/4">
            <img src={img1} className="w-full h-30 md:block md:h-40" alt="" />
            <img src={img2} className="w-full h-30 md:block md:h-40" alt="" />
          </div>
        </div>
        <div className="w-full mx-auto mt-5">
          <CategoriesSlider />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {data.data.data.map((product) => (
            <div
              key={product._id}
              className="px-2 overflow-hidden hover:shadow-2xl hover:shadow-mainColor"
            >
              <div className="relative group">
                <Link to={`/ProductDetails/${product.id}`}>
                  <img src={product.imageCover} alt={product.title} />
                  <h3 className="text-mainColor">{product.category.name}</h3>
                  <p>product._id</p>
                  <h2>{product.title.split(" ").slice(0, 1).join(" ")}</h2>
                  <div className="flex justify-between items-center">
                    <p>
                      {product.priceAfterDiscount ? (
                        <>
                          <span className="text-red-500 line-through mr-2">
                            {product.price}
                          </span>
                          <span>{product.priceAfterDiscount}</span>
                        </>
                      ) : (
                        <span>{product.price}</span>
                      )}
                    </p>
                    <p>
                      <i className="fa-solid fa-star  text-secondColor"></i>
                      {product.ratingsAverage}
                    </p>
                  </div>
                </Link>
                <div
                  onClick={() => addProductToCart(product.id)}
                  className="text-white cursor-pointer bg-mainColor rounded-lg absolute p-3 top-1 end-1 translate-x-[200%] group-hover:translate-x-0 duration-500 "
                >
                  <i className="fa-solid fa-plus"></i>
                </div>
                <button
                  onClick={() => clicked(product.id)}
                  className="bg-teal-500 hover:bg-teal-700 text-white rounded-full duration-500  w-full my-3"
                >
                  <i className="fa-solid fa-heart"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
