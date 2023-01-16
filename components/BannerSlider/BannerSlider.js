import Image from "next/image";
import Slider from "react-slick";
import { myLoader } from "../../configs/loader";
import { server } from "../../configs/domain";

const data = [
  {
    src: "/assets/images/banner1.jpg",
    alt: "banner1",
  },
  {
    src: "/assets/images/banner2.jpg",
    alt: "banner2",
  },
  {
    src: "/assets/images/banner3.jpg",
    alt: "banner3",
  },
  {
    src: "/assets/images/banner4.jpg",
    alt: "banner4",
  },
  {
    src: "/assets/images/banner5.jpg",
    alt: "banner5",
  },
  {
    src: "/assets/images/banner6.jpg",
    alt: "banner6",
  },
];
const BannerSlider = () => {
  const settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    speed: 500,
    arrows: false,
    adaptiveHeight: true,
    customPaging: (i) => (
      <div className="ft-slick__dots--custom">
        <div className="loading" />
      </div>
    ),
  };
  return (
    <Slider {...settings}>
      {data.map((item, i) => (
        <div key={i}>
          <Image
            src={item.src}
            width="0"
            height="0"
            alt={item.alt}
            priority
            loader={myLoader}
            style={{ width: "100%", height: "600px" }}
          />
        </div>
      ))}
    </Slider>
  );
};

export default BannerSlider;
