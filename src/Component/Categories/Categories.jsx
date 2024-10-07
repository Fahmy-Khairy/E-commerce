
import Loading from '../Loading/Loading'
import useCategories from '../../CustomHooks/useCategories'

export default function Categories() {
  const { isLoading, data, isError } = useCategories()
  if (isLoading) {
    return <Loading />
  }
  if (isError) {
    return <>
      <h2>Have Error</h2>
    </>
  }
  return (
    <>
      <div className='   py-3 container md:w-11/12 lg:w-4/5 mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3'>
        {data.data.data.map((brand) =>
          <div key={brand._id} className='hover:shadow-md hover:shadow-mainColor duration-1000 bg-mainColor rounded-xl '>
            <img src={brand.image} alt={brand.name} className='w-full h-96' />
            <h2 className='text-center'>{brand.name}</h2>
          </div>

        )}

      </div>
    </>
  )
}
