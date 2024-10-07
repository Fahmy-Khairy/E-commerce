import { useContext, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { authenticatedUser } from "../../Context/AuthenticatedUser";
import { cartContext } from "../../Context/UserCartContext";
import { wishlistContext } from "../../Context/UserWishlistContext";

export default function Navbar() {
  const { countOfItems, getProductIncart } = useContext(cartContext);
  const { getWishlistContent, countOfWishlist } = useContext(wishlistContext);
  useEffect(() => {
    getProductIncart();
    getWishlistContent();
  }, []);
  const navigate = useNavigate();
  const { token, setToken } = useContext(authenticatedUser);
  function handelLogout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }
  return (
    <nav className="py-3 bg-gray-400 fixed top-0 left-0 right-0 z-50">
      <div className="xl:w-4/5  px-2  mx-auto bg-opacity-20 flex justify-between">
        {/*   left part   */}
        <div className=" flex gap-4 items-center justify-center ">
          <Link className="flex gap-3 justify-center items-center" to={"home"}>
            <i className="fa-solid fa-cart-shopping text-mainColor text-3xl"></i>
            <h1 className="text-3xl font-bold">FreshCart</h1>
          </Link>
          {token ? (
            <div className=" flex justify-center gap-5 items-center text-gray-700 text-xl font-thin absolute md:sticky top-full right-0 left-0 bg-gray-400 z-30">
              <NavLink className="hover:text-gray-900 duration-200" to={"home"}>
                Home
              </NavLink>
              <NavLink
                className="hover:text-gray-900 duration-200"
                to={"Categories"}
              >
                Categories
              </NavLink>
              <NavLink
                className="hover:text-gray-900 duration-200"
                to={"Brands"}
              >
                Brands
              </NavLink>
              <NavLink className="hover:text-gray-900 duration-200" to={"cart"}>
                <i className="fa-solid fa-cart-shopping relative ">
                  {countOfItems === 0 ? undefined : (
                    <p className="bg-rose-700 w-5 h-5 text-sm text-center flex justify-center items-center text-white p-1 rounded-full absolute top-1 right-1 translate-x-full -translate-y-full">
                      {countOfItems}
                    </p>
                  )}
                </i>
              </NavLink>
              {countOfWishlist ? (
                <NavLink
                  className="hover:text-gray-900 duration-200 text-2xl"
                  to={"Wishlist"}
                >
                  <i className="fa-solid fa-heart relative">
                    {countOfWishlist === 0 ? undefined : (
                      <p className="bg-rose-700 w-5 h-5 text-sm text-center flex justify-center items-center text-white p-1 rounded-full absolute top-2 right-1 translate-x-full -translate-y-full">
                        {countOfWishlist}
                      </p>
                    )}
                  </i>
                </NavLink>
              ) : (
                navigate("/home")
              )}
            </div>
          ) : (
            ""
          )}
        </div>

        {/*   right part  */}
        <div className="flex gap-4 justify-center items-center">
          <ul className="md:flex md:gap-2  items-center">
            <li className="hidden md:block">
              <ul className="flex gap-2">
                <li>
                  <i className="fa-brands fa-facebook cursor-pointer"></i>
                </li>
                <li>
                  <i className="fa-brands fa-instagram-square cursor-pointer"></i>
                </li>
                <li>
                  <i className="fa-brands fa-linkedin cursor-pointer"></i>
                </li>
                <li>
                  <i className="fa-brands fa-twitter cursor-pointer"></i>
                </li>
                <li>
                  <i className="fa-brands fa-youtube cursor-pointer"></i>
                </li>
                <li>
                  <i className="fa-brands fa-tiktok cursor-pointer"></i>
                </li>
              </ul>
            </li>
            <li>
              <div className="space-x-4 divide-transparent text-gray-700 text-xl ">
                {token ? (
                  <span
                    onClick={handelLogout}
                    className="cursor-pointer hover:text-gray-900 duration-200"
                  >
                    LogOut
                  </span>
                ) : (
                  <>
                    <NavLink
                      to={"login"}
                      className="hover:text-gray-900 duration-200"
                    >
                      LogIn
                    </NavLink>
                    <NavLink
                      to={"Register"}
                      className="hover:text-gray-900 duration-200"
                    >
                      Register
                    </NavLink>
                  </>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
