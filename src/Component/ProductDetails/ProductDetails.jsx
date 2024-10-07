import axios from "axios"
import { useQuery } from "react-query"
import Loading from "../Loading/Loading"
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { cartContext } from "../../Context/UserCartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
    
   const {addToCart} = useContext(cartContext)
    const {id} = useParams() ;

    function getProductDetails() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }

    const { data, isError, isLoading } = useQuery({
        queryKey: ['productDetails',id],
        queryFn: (id) => getProductDetails(id)
    })
    if (isLoading) {
        return <Loading />
    }
    if (isError) {
        return <>
            <h2>Have Error</h2>
        </>
    }
    async function addProductToCart (){
       const resFlag =  await addToCart(id);
       if(resFlag){
        // flag 
        toast.success('Product is Adding',{
            position:"top-right",
            duration: 3000
        })
       }
       else{
        toast.error('Error Adding Product',{
            position:"top-right",
            duration: 3000
        })
       }
    }
    


    return (
        <>
            <div className="container lg:w-4/5 gap-7 mx-auto py-7 lg:flex justify-center items-center">
                <div className="lg:w-1/3">
                    <img src={data.data.data.imageCover} className="w-full" alt={data.data.data.title} />
                </div>

                
                    <div key={data.data.data._id} className="lg:w-2/3">
                        <h1 className="text-2xl font-bold">{data.data.data.title}</h1>
                        <p className="text-gray-500">{data.data.data.description}</p>
                        <p className="text-mainColor">Category : {data.data.data.category.name}</p>
                        <p className="font-bold">Brand :  {data.data.data.brand.name}</p>
                        <div className="flex justify-between items-center">
                            {data.data.data.priceAfterDiscount? <div><span className='text-red-500 line-through mr-2'>{data.data.data.price}</span>
                            <span>{data.data.data.priceAfterDiscount}</span>
                        </div> 
                        :<p>  <span>{data.data.data.price}</span></p>}
                            <p><i className="fa-solid fa-star  text-secondColor"></i>{data.data.data.ratingsAverage}</p>
                        </div>
                        <button onClick={addProductToCart} className=" w-full bg-mainColor mt-3 py-2 rounded-xl text-white "> + Add To Cart </button>
                    </div>
                
            </div>
        </>
    )
}
