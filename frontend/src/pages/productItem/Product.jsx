import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import {
  FaHeart,
  FaMinus,
  FaPlus,
  FaRegHeart,
  FaRegStar,
  FaStar,
  FaStarHalfStroke,
} from "react-icons/fa6";
import Header from "../../components/header/Header";
import { MdDelete, MdOutlineDone } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import useGetProduct from "../../hooks/product/useGetProduct";
import { useDispatch, useSelector } from "react-redux";
import { useAuthContext } from "../../context/AuthContext";
import useToggleLikesProduct from "../../hooks/product/useToggleLikesProduct.js";
import useDeleteProduct from "../../hooks/product/useDeleteProduct.js";
import { cartActions } from "../../redux/slices/cartSlice.js";
import toast from "react-hot-toast";
import AddReview from "../../components/review/AddReview.jsx";

const Product = () => {
  const { authUser } = useAuthContext();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product } = useSelector((state) => state.product);
  const { loading } = useGetProduct(id);
  const [liked, setLiked] = useState(false);
  const discountPrice =
    product?.price - product?.price * (product?.discountPrice / 100);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [activeClass, setActiveClass] = useState(0);
  const swiperRef = useRef(null);

  const fullStar = Math.floor(product && product?.rating);
  const halfStar = product && product?.rating - fullStar;
  const emptyStar = 5 - fullStar - (halfStar ? 1 : 0);

  const [review, setReview] = useState(false);

  const { likedProduct } = useToggleLikesProduct();

  useEffect(() => {
    if (authUser?.favoriteProducts.includes(id)) {
      setLiked(true);
    }
  }, [authUser?.favoriteProducts, id]);

  const handleToggleLikes = (id) => {
    likedProduct(id);
    setLiked(!liked);
  };

  const handleActiveImage = (idx) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(idx);
      setActiveClass(idx);
    }
  };

  const handleQuantity = (type) => {
    if (type === "INC" && quantity < product.stock) {
      setQuantity(quantity + 1);
    } else if (type === "DEC" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const { delLoading, deleteProduct } = useDeleteProduct();

  const deletHandler = () => {
    Swal.fire({
      title: "Are you sure you want delete this product? ",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id);
      }
    });
  };

  const addToCart = () => {
    if (!authUser) {
      toast.error("You must be logged in first!");
    } else {
      if (product?.colors?.length > 0) {
        if (color.trim() === "") return toast.error("you must choose a color");
      }
      if (product?.size?.length > 0) {
        if (size.trim() === "") return toast.error("you must choose a size");
      }
      dispatch(
        cartActions.AddToCart({
          ...product,
          color,
          size,
          quantity,
          discountPercent: discountPrice,
          totalPrice: discountPrice * quantity,
        })
      );
    }
  };

  return (
    <>
      {delLoading ? (
        <div className="flex items-center justify-center">
          <div className="loading loading-spinner"></div>
        </div>
      ) : (
        <>
          <Header />
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="loading loading-spinner"></div>
            </div>
          ) : (
            <div className="p-3 flex items-center gap-10 max-md:flex-col mt-3 ">
              <div className="flex gap-3 items-center">
                <div className="border p-3 rounded-md w-72 max-md:w-44">
                  <Swiper
                    slidesPerView={1}
                    ref={swiperRef}
                    allowTouchMove={false}
                  >
                    {product?.productImages.map((image, idx) => (
                      <SwiperSlide key={idx}>
                        <img src={image.url} alt="product image" />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <div className="flex flex-col gap-2">
                  {product?.productImages.map((image, idx) => (
                    <div
                      key={idx}
                      className={`w-32 max-md:w-20 border rounded-md cursor-pointer p-2 ${
                        activeClass === idx
                          ? "border-blue-700"
                          : "hover:border-blue-400"
                      } `}
                      onClick={() => handleActiveImage(idx)}
                    >
                      <img src={image?.url} alt="products images" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="select-none max-md:p-5 flex gap-5">
                <div>
                  <div className="font-semibold text-lg w-96 max-lg:w-fit leading-[1.2] mb-3">
                    {product?.productName}
                  </div>
                  <div className="flex items-center gap-2">
                    rating :{" "}
                    <span className="font-semibold flex items-center gap-[1px]">
                      {[...Array(fullStar)].map((_, idx) => (
                        <FaStar key={idx} color="gold" />
                      ))}
                      {halfStar > 0 && <FaStarHalfStroke color="gold" />}
                      {[...Array(emptyStar)].map((_, idx) => (
                        <FaRegStar key={idx} color="gold" />
                      ))}
                    </span>
                    <div
                      className=" cursor-pointer bg-blue-200 w-[20px] hover:w-[120px] hover:p-[5px] h-[20px] hover:h-[23px]
                        rounded-full flex gap-1 items-center justify-center
                      font-bold group"
                      onClick={() => setReview(!review)}
                    >
                      <FaPlus size={10} />
                      <div className="hidden group-hover:block">add review</div>
                    </div>
                  </div>
                  <div>
                    {product?.discountPrice > 0 ? (
                      <div>
                        <div className="text-[16px] font-[400]">
                          Was :{" "}
                          <del className="text-gray-500">${product?.price}</del>
                        </div>
                        <div className="text-[16px] font-[400]">
                          Now :{" "}
                          <span className="text-lg font-semibold">
                            ${discountPrice}
                          </span>{" "}
                          <span className="bg-green-300 px-[5px] py-[1px] rounded-md">
                            {product?.discountPrice}% off
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-lg font-semibold">
                          <span className="text-[16px] font-[400]">
                            Price :
                          </span>{" "}
                          ${product?.price}
                        </div>
                      </div>
                    )}
                  </div>
                  {product?.colors?.length > 0 && (
                    <div className="mt-3 flex items-center gap-[5px]">
                      Colors :{" "}
                      {product?.colors.map((proColor, idx) => (
                        <abbr title={color} key={idx}>
                          <span
                            style={{ backgroundColor: proColor }}
                            className={`w-[19px] h-[19px] rounded-full cursor-pointer flex justify-center items-center p-[2px] `}
                            onClick={() => setColor(proColor)}
                          >
                            {proColor === color && (
                              <MdOutlineDone
                                color="white"
                                className="font-semibold"
                              />
                            )}
                          </span>
                        </abbr>
                      ))}
                    </div>
                  )}
                  {product?.size?.length > 0 && (
                    <div className="mt-3">
                      Size :{" "}
                      <select
                        className="bg-slate-100 border-none p-2 focus:outline-none"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                      >
                        <option hidden>Select Size</option>
                        {product?.size?.map((size, idx) => (
                          <option value={size} key={idx}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div className="flex items-center mt-5">
                    <span className="mr-1">Quantity : </span>
                    {product?.stock - quantity >= 0 ? (
                      <>
                        <FaMinus
                          className="border w-[30px] h-[35px] p-[7px] cursor-pointer"
                          onClick={() => handleQuantity("DEC")}
                        />
                        <span className="w-[40px] h-[35px] font-semibold select-none border text-lg flex items-center justify-center">
                          {quantity}
                        </span>

                        <FaPlus
                          className="border w-[30px] h-[35px] p-[7px] cursor-pointer"
                          onClick={() => handleQuantity("INC")}
                        />
                      </>
                    ) : (
                      <div className="text-red-500 font-semibold text-lg">
                        Out Of Stock
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-5">
                    <div
                      className="btn text-[#777] bg-blue-200 border-none text-lg hover:bg-blue-300 hover:text-black transition-all
            hover:font-semibold hover:text-[16px] "
                      onClick={addToCart}
                    >
                      Add To Cart
                    </div>
                    <div
                      className="cursor-pointer border bg-slate-100 p-3 rounded-md backdrop-blur-md bg-opacity-0"
                      onClick={() => handleToggleLikes(product?._id)}
                    >
                      {liked ? (
                        <FaHeart color="red" size={20} />
                      ) : (
                        <FaRegHeart size={20} />
                      )}
                    </div>
                  </div>
                </div>
                {authUser?.isAdmin && (
                  <div>
                    <div className="flex justify-center items-center gap-2">
                      <Link
                        to={`/admin_dashboard/update_product/${product?._id}`}
                      >
                        <FaEdit
                          size={27}
                          color="green"
                          className="cursor-pointer"
                        />
                      </Link>
                      <MdDelete
                        size={27}
                        color="red"
                        className="cursor-pointer"
                        onClick={deletHandler}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="divider mt-5"></div>
          {review && <AddReview setReview={setReview} id={id} />}
        </>
      )}
    </>
  );
};

export default Product;
