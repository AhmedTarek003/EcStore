import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { useRef } from "react";
import { useSelector } from "react-redux";
import useGetAllCategories from "../../hooks/category/useGetAllCategories.js";

const Categories = () => {
  const { categories } = useSelector((state) => state.category);
  useGetAllCategories();
  const swiperRef = useRef(null);
  const handlerMouseEnter = () => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.stop();
    }
  };
  const handlerMouseLeave = () => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.start();
    }
  };
  return (
    <div
      className="p-2"
      onMouseEnter={handlerMouseEnter}
      onMouseLeave={handlerMouseLeave}
    >
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="flex gap-5 justify-center p-2"
        spaceBetween={30}
        breakpoints={{
          340: {
            slidesPerView: 2,
          },
          670: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          waitForTransition: true,
        }}
        speed={2000}
        loop={categories.length >= 1}
        modules={[Autoplay]}
      >
        {categories?.map((category) => (
          <SwiperSlide key={category?._id}>
            <Link
              to={`/categories/${category?.category}`}
              className="hover:bg-slate-200 block w-full text-center py-2 text-lg font-semibold rounded-md shadow-lg"
            >
              {category?.category}
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Categories;
