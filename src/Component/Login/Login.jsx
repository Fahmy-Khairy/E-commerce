import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { authenticatedUser } from '../../Context/AuthenticatedUser';

export default function Login() {
  const {setToken , token}= useContext(authenticatedUser)
  const navigate = useNavigate()
  const [isTrue, setIsTrue] = useState(false)
  const [massage, setMassage] = useState(null)
  const [isclick, setIsclick] = useState(true)
  function loginAPI(values) {
    setIsclick(false)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).
      then((x) => {
        // console.log("right", x.data.token);
        setToken(x.data.token)
        localStorage.setItem("token",x.data.token)
        setIsTrue(true)
        setIsclick(true)
        setMassage(null)
        setTimeout(() => {  
          navigate('/home')
        }, 1000);
      }).
      catch((x) => {
        // console.log("3lt", x.response.data.message);
        setIsTrue(false)
        setMassage(x.response.data.message)
        setTimeout(() => {
          setMassage(null)
        }, 1000);
        setIsclick(true)
      })
  }

  const loginFormic = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: (values) => {
      // console.log("Login", values);
      loginAPI(values)
    },
    validationSchema: yup.object().shape({
      email: yup.string().email("Entre format of email").required("Enter your email"),
      password: yup.string().required('Enter your password')
    })
  })
  return (
    <div className='py-9'>
      <h2 className='text-center text-xl mb-4'>Login Now : </h2>
      <form onSubmit={loginFormic.handleSubmit} className="max-w-md mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input onBlur={loginFormic.handleBlur} onChange={loginFormic.handleChange} value={loginFormic.values.email} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
          {loginFormic.errors.email && loginFormic.touched.email ?
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  dark:text-red-400" role="alert">
              {loginFormic.errors.email}
            </div>
            : ''}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input onBlur={loginFormic.handleBlur} onChange={loginFormic.handleChange} value={loginFormic.values.password} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>

          {loginFormic.errors.password && loginFormic.touched.password ?
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  dark:text-red-400" role="alert">
              {loginFormic.errors.password}
            </div>
            : ''}
        </div>
        {isTrue ? <div className="p-4 mb-4 text-sm text-center text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
          Welcome Back
        </div> : ''}
        {massage ? <div className="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {massage}
        </div> : ''}
        <button type="submit" className="text-white bg-mainColor hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-mainColor dark:hover:bg-green-600 dark:focus:ring-green-700">
          {isclick?'Login':<ColorRing
            visible={true}
            height="40"
            width="40"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#fff', '#fff', '#fffa', '#fff', '#fff']}
          />}

          </button>
      </form>
    </div>


  )
}
