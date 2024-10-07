import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from '../../assets/images/slider-image-1.jpeg'
import img2 from '../../assets/images/slider-image-2.jpeg'
import img3 from '../../assets/images/slider-image-3.jpeg'

export default function HomeSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 2000,
        

    };
    return (
        <Slider {...settings} autoplay={200} arrows={false}>
            <div>
                <img src={img1} className="w-full h-80" alt="" />
            </div>
            <div>
                <img src={img2} className="w-full h-80" alt="" />
            </div>
            <div>
                <img src={img3} className="w-full h-80" alt="" />
            </div>
        </Slider>
    );
}