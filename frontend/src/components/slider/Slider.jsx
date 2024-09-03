import slider from "../../utils/dummyData";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Navigation } from "swiper/modules";

const Slider = () => {
  return (
    <div>
      <Swiper
        className="relative group"
        spaceBetween={50}
        slidesPerView={1}
        autoplay={true}
        loop={true}
        navigation={{
          nextEl: ".button-next-slide",
          prevEl: ".button-prev-slide",
        }}
        modules={[Navigation, Autoplay]}
      >
        {slider.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={slide.image}
              alt=""
              className="max-h-[500px] w-full select-none"
            />
          </SwiperSlide>
        ))}
        <div
          className="button-prev-slide w-[40px] h-[40px] bg-black text-white grid place-items-center
          text-2xl cursor-pointer absolute top-[50%] z-10 group-hover:left-0 -left-[23rem] duration-500 
          "
        >
          <RiArrowLeftSLine />
        </div>
        <div
          className="button-next-slide w-[40px] h-[40px] bg-black text-white grid place-items-center
          text-2xl cursor-pointer absolute top-[50%] z-10 group-hover:right-0 -right-[23rem] duration-500"
        >
          <RiArrowRightSLine />
        </div>
      </Swiper>
    </div>
  );
};

export default Slider;
