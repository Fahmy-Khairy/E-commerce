import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from "../Loading/Loading";
import useCategories from "../../CustomHooks/useCategories";

export default function CategoriesSlider() {
    const { data, isError, isLoading } = useCategories()
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        autoplaySpeed: 2000,
        responsive: [
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            }
          ]

    };
    if (isLoading) {
        return <Loading />
    }
    if (isError) {
        return <>
            <h2>Have Error</h2>
        </>
    }

    return (
        <Slider autoplay={200} {...settings} arrows={false}>

            {data.data.data.map((category) => <div  key={category._id}>
                <img src={category.image} className="w-full h-48" alt={category.name} />
                <h6>{category.name}</h6>
            </div>)}



        </Slider>
    );
}