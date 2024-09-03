import { useRef, useState } from "react";
import DashboardHeader from "../../../components/header/DashBoardHeader";
import SelectColors from "../../../components/selectForProducts/SelectColors";
import SelectSize from "../../../components/selectForProducts/SelectSize";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import useGetAllCategories from "../../../hooks/category/useGetAllCategories.js";
import { useSelector } from "react-redux";
import useCreateProduct from "../../../hooks/product/useCreateProduct";

const CreateProduct = () => {
  const [inputs, setInputs] = useState({
    productName: "",
    category: "",
    price: "",
    discountPrice: "",
    stock: "",
  });
  useGetAllCategories();
  const { categories } = useSelector((state) => state.category);
  const [colors, setSelectColros] = useState([]);
  const [size, setSelectSize] = useState([]);
  const [images, setImages] = useState(null);

  const [activeClass, setActiveClass] = useState(0);
  const swiperRef = useRef(null);
  const handleActiveImage = (idx) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(idx);
      setActiveClass(idx);
    }
  };

  const { loading, create } = useCreateProduct();

  const submitHandler = (e) => {
    e.preventDefault();
    create({ ...inputs, colors, size, images });
  };

  return (
    <>
      <DashboardHeader />
      <div className="p-3">
        <div className="text-center text-3xl uppercase mt-3 text-gray-600">
          Add new product
        </div>
        <form className="flex flex-col mt-5" onSubmit={submitHandler}>
          <div className="flex max-md:flex-col gap-5">
            <div className="flex-1">
              <label htmlFor="product_images">
                <div className="btn btn-sm btn-warning cursor-pointer text-white">
                  chooese product images
                </div>
              </label>
              <input
                type="file"
                accept="image"
                className="hidden"
                id="product_images"
                multiple
                onChange={(e) => setImages(Array.from(e.target.files))}
              />
              <div className="flex gap-3 items-center">
                <div className="border p-3 rounded-md w-72 max-md:w-44">
                  <Swiper
                    slidesPerView={1}
                    ref={swiperRef}
                    allowTouchMove={false}
                  >
                    {images?.map((image, idx) => (
                      <SwiperSlide key={idx}>
                        <img
                          src={URL.createObjectURL(image)}
                          alt="product image"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <div className="flex flex-col gap-2">
                  {images?.map((image, idx) => (
                    <div
                      key={idx}
                      className={`w-32 max-md:w-20 border rounded-md cursor-pointer p-2 ${
                        activeClass === idx
                          ? "border-blue-700"
                          : "hover:border-blue-400"
                      } `}
                      onClick={() => handleActiveImage(idx)}
                    >
                      <img
                        src={URL.createObjectURL(image)}
                        alt="products images"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div>
                <label className="label">Product Name</label>
                <input
                  type="text"
                  placeholder="enter product name"
                  className="input bg-slate-100 w-[60%] max-md:w-[100%] shadow-md"
                  value={inputs.productName}
                  onChange={(e) =>
                    setInputs({ ...inputs, productName: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="label">Category</label>
                <select
                  className=" bg-slate-100 shadow-md w-40 focus:outline-none p-3"
                  value={inputs.category}
                  onChange={(e) =>
                    setInputs({ ...inputs, category: e.target.value })
                  }
                >
                  <option hidden>select category</option>
                  {categories.map((category) => (
                    <option value={category?.category} key={category?._id}>
                      {category?.category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">Price</label>
                <input
                  type="number"
                  placeholder="enter product price"
                  className="input bg-slate-100 w-[60%] max-md:w-[100%]  shadow-md"
                  value={inputs.price}
                  onChange={(e) =>
                    setInputs({ ...inputs, price: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="label">Discount Price (optional)</label>
                <input
                  type="number"
                  placeholder="enter discount price"
                  className="input bg-slate-100 w-[60%] max-md:w-[100%]  shadow-md"
                  value={inputs.discountPrice}
                  onChange={(e) =>
                    setInputs({ ...inputs, discountPrice: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="label">Stock</label>
                <input
                  type="number"
                  placeholder="enter product Stock"
                  className="input bg-slate-100 w-[60%] max-md:w-[100%]  shadow-md"
                  value={inputs.stock}
                  onChange={(e) =>
                    setInputs({ ...inputs, stock: e.target.value })
                  }
                />
              </div>
              <SelectColors
                selectColors={colors}
                setSelectColros={setSelectColros}
              />
              <SelectSize selectSize={size} setSelectSize={setSelectSize} />
            </div>
          </div>
          <button
            className="btn btn-info w-[30%] max-md:w-[80%] mx-auto my-7 text-white text-[18px]"
            disabled={loading}
          >
            {loading ? (
              <div className="loading loading-spinner"></div>
            ) : (
              "Add Product"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateProduct;
