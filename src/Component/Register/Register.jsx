import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { ColorRing, FallingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { authenticatedUser } from '../../Context/AuthenticatedUser';

export default function Register() {
  const {setToken} = useContext(authenticatedUser)
  const [errorMassage, setErrorMassage] = useState(null)
  const [IsSuccess, setIsSuccess] = useState(false)
  const [isSubmit, setIsSubmit] = useState(true)
  const navigate = useNavigate()
  let user = {
    name: '',
    email: '',
    password: '',
    rePassword: '',
    phone: ''
  }


  async function registerApi(values) {
    setIsSubmit(false)
     axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values).
      then((x) => {
        // console.log(x.data.message);
        setToken(x.data.token)
        localStorage.setItem("token",x.data.token)
        setIsSuccess(true)
        setErrorMassage(null)
        setTimeout(() => {
          navigate('/home')
        }, 1000);
        setIsSubmit(true)
        

      }).
      catch((x) => {
        // console.log(x.response.data.message);
        setErrorMassage(x.response.data.message)
        setIsSuccess(false)
        setTimeout(() => {
          setErrorMassage(null)
        }, 1000);
        setIsSubmit(true)

      })


  }

  const registerFormik = useFormik({
    initialValues: user,
    onSubmit: (values) => {
      // console.log('Hello from formik', values);
      registerApi(values)
    },
    // validate: (values) => {
    //   let errors = {};
    //   const nameValidate = /^[A-Z][a-z]{4,12}$/
    //   const phoneValidate = /^01[0125][0-9]{8}$/
    //   // const emailValidate = /^[A-Za-z0-9]{5,15}[@[a-z]{5,7}.com]$/
    //   // console.log(emailValidate.test('fahmykhairy78@gmail.com'));
    //   // console.log(phoneValidate.test('01002421467'));
    //   if (!nameValidate.test(values.name)) {
    //     errors.name = 'Name must start with capital character'
    //   }

    //   if (!values.email.includes('@') || !values.email.includes('.')) {
    //     errors.email = 'Email must include . & @'
    //   }
    //   if (values.password.length < 6 || values.password.length > 12) {
    //     errors.password = 'Password must be from 6 to 12 characters'
    //   }
    //   if (values.rePassword != values.password) {
    //     errors.rePassword = "Password doesn't match with rePassword"
    //   }
    //   if (!phoneValidate.test(values.phone)) {
    //     errors.phone = 'Must be Egyption phone '
    //   }
    //   console.log(errors);


    //   return errors


    // },

    validationSchema: yup.object().shape({
      name: yup.string().min(3, 'Minmum length 3 chataters').max(12, 'Maxmum length 12 chataters').required("Enter Your Name"),
      email: yup.string().email('your email must be in this format (asdasd@asd.asd)').required("Enter Your Email"),
      password: yup.string().max(12, "Maxmum length 12 chataters").min(6, "Minmum length 6 chataters").required(),
      rePassword: yup.string().required().oneOf([yup.ref('password')]),
      phone: yup.string().required("Enter Your Phone").matches(/^01[0125][0-9]{8}$/, "must be Eggyption Number")
    })

  })

  return (
    <div className='p-5  mt-10'>

      {errorMassage ? <div className="p-4 mb-4 text-sm text-red-500 rounded-lg bg-red-5" role="alert">
        {errorMassage}
      </div> : ''}
      {IsSuccess ? <div className="p-4 mb-4 text-sm text-mainColor rounded-lg bg-red-5" role="alert">
        congraulation
      </div> : ''}

      <form className="max-w-md mx-auto" onSubmit={registerFormik.handleSubmit}>
        <h2 className=' text-xl mb-4'>Register Now :</h2>
        <div className="relative z-0 w-full mb-5 group">
          <input type="text" value={registerFormik.values.name} onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name : </label>
          {registerFormik.errors.name && registerFormik.touched.name ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
            {registerFormik.errors.name}
          </div> : ''}
          {/* <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
            <span class="font-medium">Danger alert!</span> Change a few things up and try submitting again.
          </div> */}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input value={registerFormik.values.email} onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email :</label>
          {registerFormik.errors.email && registerFormik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
            {registerFormik.errors.email}
          </div> : ''}
          {/* <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
            <span class="font-medium">Danger alert!</span> Change a few things up and try submitting again.
          </div> */}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input value={registerFormik.values.phone} onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone :</label>
          {registerFormik.errors.phone && registerFormik.touched.phone ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
            {registerFormik.errors.phone}
          </div> : ''}
          {/* <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
            <span class="font-medium">Danger alert!</span> Change a few things up and try submitting again.
          </div> */}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input value={registerFormik.values.password} onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password :</label>
          {registerFormik.errors.password && registerFormik.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
            {registerFormik.errors.password}
          </div> : ''}
          {/* <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
            <span class="font-medium">Danger alert!</span> Change a few things up and try submitting again.
          </div> */}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input value={registerFormik.values.rePassword} onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} type="password" name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password :</label>
          {registerFormik.errors.rePassword && registerFormik.touched.rePassword ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
            {registerFormik.errors.rePassword}
          </div> : ''}
          {/* <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
            <span class="font-medium">Danger alert!</span> Change a few things up and try submitting again.
          </div> */}
        </div>

        <button type="submit" className="text-white bg-mainColor hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-mainColor dark:hover:bg-green-600 dark:focus:ring-green-700">
          {isSubmit ? 'Submit' : <ColorRing
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
