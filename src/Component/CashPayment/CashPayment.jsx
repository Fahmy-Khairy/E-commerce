import axios from "axios"
import { useFormik } from "formik"
import { useContext, useState } from "react";
import * as yup from 'yup';
import { cartContext } from "../../Context/UserCartContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CashPayment() {

    const { cartId,setCountOfItems, clearUserCart } = useContext(cartContext)
    const navigate =  useNavigate()
    const [isOnline, setIsOnline] = useState(false)
    function detectButton (values){
        if(isOnline){
            console.log("online");
            
            onlinePayment(values)
        }else{
            console.log("cash");

            paymentAPI(values)
        }

    }

    async function onlinePayment(values){
        const backEndFormat = {
            "shippingAddress": values
        }
        try {
            const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
                backEndFormat,
                {
                    headers: {
                        token: localStorage.getItem("token")
                    },
                    params:{
                        url:"http://localhost:3333"
                    }
                });
            console.log("result of online payment", res.data);
            setCountOfItems(0);
            toast.success("Your Order Created..", {
                duration: 1000,
                className: "text-xl",
                position: "top-right"
            });
            setTimeout(() => {
                window.open(res.data.session.url,"_self")
                clearUserCart()
            }, 1000);
        } 
        catch (err) {
            console.log(err);
            toast.error("Error In Your Order", {
                duration: 1000,
                className: "text-xl",
                position: "top-right"
            });
        }
    }

    async function paymentAPI(values) {
        const backEndFormat = {
            "shippingAddress": values
        }
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`
            , backEndFormat,
            {
                headers: {
                    token: localStorage.getItem("token")
                }
            }).
            then((res) => {
                console.log("result of payment", res.data);
                setCountOfItems(0)
                toast.success("Your Order Created..",{
                    duration:1000,
                    className:"text-xl",
                    position:"top-right"
                })
                setTimeout(()=>{
                    navigate('/home')
                },1000)

            }).
            catch((err) => {
                console.log(err);
                toast.error("Error In Your Order",{
                    duration:1000,
                    className:"text-xl",
                    position:"top-right"
                })
            })
    }
    
    const paymentForm = useFormik({
        initialValues: {
            details: '',
            phone: '',
            city: ''
        },
        onSubmit: detectButton,
        validationSchema: yup.object().shape({
            details: yup.string().min(12, 'Minimum length 12 Characters').required("Enter Your Address Details"),
            phone: yup.string().matches(/^01[0125][0-9]{8}$/, "Enter Egyptian Number").required("Enter Your Phone"),
            city: yup.string().required('Enter Your City').max(16, "Maximum 16 Characters").min(4, "Minimum 4 Characters")
        })
    })



    return <>
        <div className="py-5">
            <form onSubmit={paymentForm.handleSubmit} className="max-w-sm mx-auto">
                <div className="mb-5">
                    <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 ">Your Address Details</label>
                    <input onBlur={paymentForm.handleBlur} onChange={paymentForm.handleChange} value={paymentForm.values.details} type="text" id="details" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
                    {paymentForm.errors.details && paymentForm.touched.details ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {paymentForm.errors.details}
                    </div> : ''}
                </div>
                <div className="mb-5">
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Your Phone</label>
                    <input onBlur={paymentForm.handleBlur} onChange={paymentForm.handleChange} value={paymentForm.values.phone} type="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
                    {paymentForm.errors.phone && paymentForm.touched.phone ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {paymentForm.errors.phone}
                    </div> : ''}
                </div>
                <div className="mb-5">
                    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 ">Your City</label>
                    <input onBlur={paymentForm.handleBlur} onChange={paymentForm.handleChange} value={paymentForm.values.city} type="text" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
                    {paymentForm.errors.city && paymentForm.touched.city ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {paymentForm.errors.city}
                    </div> : ''}
                </div>
                <button type="submit" onClick={ ()=>setIsOnline(false)} className="text-white bg-mainColor hover:bg-green-800  duration-300  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-mainColor dark:hover:bg-green-800 ">
                    Cash order
                </button>
                <button type="submit" onClick={ ()=>setIsOnline(true)} className=" ml-4 text-white bg-mainColor hover:bg-green-800  duration-300  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-mainColor dark:hover:bg-green-800 ">
                    Online order
                </button>
            </form>
        </div>

    </>
}
