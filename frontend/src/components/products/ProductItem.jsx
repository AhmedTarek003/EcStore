import { useEffect, useState } from "react";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import useToggleLikesProduct from "../../hooks/product/useToggleLikesProduct";

const ProductItem = ({ product }) => {
  const [liked, setLiked] = useState(false);
  const discountPrice =
    product?.price - product?.price * (product?.discountPrice / 100);
  const { authUser } = useAuthContext();
  const { likedProduct } = useToggleLikesProduct();

  useEffect(() => {
    if (authUser?.favoriteProducts?.includes(product?._id)) {
      setLiked(true);
    }
  }, [authUser?.favoriteProducts, product?._id]);

  const handleToggleLike = (id) => {
    setLiked(!liked);
    likedProduct(id);
  };

  return (
    <div className="w-56 max-md:w-36 border rounded-[10px] p-[8px] relative select-none">
      <Link to={`/products/${product?._id}`}>
        <div className="bg-slate-100 rounded-md p-[10px]">
          <img
            src={product?.productImages[0]?.url}
            alt=""
            loading="lazy"
            className="w-52 object-cover min-h-[190px] bg-cover"
          />
          <div className="flex items-center gap-1 bg-white px-4 m-2 rounded-full w-fit text-lg text-gray-500">
            {product?.rating}
            <FaStar color="green" size={12} />
          </div>
        </div>
        <div className="max-w-[100%] mt-2">
          <div className=" text-[17px] leading-[1.1] line-clamp-2">
            {product?.productName}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="text-lg font-[500]">
              <span className="text-[16px] text-gray-600">$</span>
              {discountPrice}
            </div>
            {product?.discountPrice > 0 && (
              <>
                <del className="text-gray-400">${product.price}</del>
                <div className="text-green-400 font-bold text-[14px]">
                  {product?.discountPrice}%
                </div>
              </>
            )}
          </div>
        </div>
      </Link>
      <div
        className="absolute top-4 right-6 cursor-pointer border bg-slate-100 p-1 rounded-md backdrop-blur-md bg-opacity-0"
        onClick={() => handleToggleLike(product?._id)}
      >
        {authUser?.favoriteProducts?.includes() || liked ? (
          <FaHeart color="red" size={20} />
        ) : (
          <FaRegHeart size={20} />
        )}
      </div>
    </div>
  );
};

export default ProductItem;
