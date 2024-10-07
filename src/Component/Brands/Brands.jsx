import axios from 'axios'
import React from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import Loading from '../Loading/Loading'

export default function Brands() {
  function getAllBrands() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  }
  const { data, isLoading, isError } = useQuery({
    queryKey: 'allBrands',
    queryFn: getAllBrands,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })
  if (isLoading) {

    return <Loading/>
  }
  if (isError) {
    return <>
      <h2>Have Error</h2>
    </>
  }
  return (
    <>
      <div className=' py-3 container md:w-11/12 lg:w-4/5 mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3'>
        {data.data.data.map((brand) => 
          <div key={brand._id} className='bg-mainColor rounded-xl hover:shadow-2xl hover:shadow-mainColor duration-1000'>
            <img src={brand.image} alt={brand.name} className='w-full' />
            <h2 className='text-center'>{brand.name}</h2>
          </div>

        )}

      </div>
    </>
  )
}
