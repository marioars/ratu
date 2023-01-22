import Image from "next/image";
import Slider from "react-slick";
import { myLoader } from "../../configs/loader";

const BannerSlider = (props) => {
  const { banners: data } = props;
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
      {data?.map((item, i) => (
        <div key={i}>
          <Image
            src={item.image_banner}
            width="0"
            height="0"
            alt="banner"
            priority
            loader={myLoader}
            style={{ width: "100%", height: "600px", objectFit: "cover" }}
          />
        </div>
      ))}
    </Slider>
  );
};

export default BannerSlider;
