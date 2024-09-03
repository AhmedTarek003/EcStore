import { useSelector } from "react-redux";
import useGetFavProducts from "../../hooks/product/useGetFavProducts";
import ProductItem from "../products/ProductItem";
import { Link } from "react-router-dom";

const WishListProducts = ({ productsId }) => {
  const { favProducts } = useSelector((state) => state.product);
  const { loading } = useGetFavProducts(productsId);

  return favProducts.length > 0 ? (
    <div className="flex flex-wrap flex-col items-center my-3 gap-2 p-3 justify-center">
      <div className="text-4xl my-5 font-semibold text-gray-500 tracking-wider border-b-2">
        WhishList Products
      </div>
      <div className="flex flex-wrap items-center my-3 gap-2 p-3 justify-center">
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="loading loading-spinner"></div>
          </div>
        ) : (
          favProducts?.map((product) => (
            <ProductItem key={product?._id} product={product} />
          ))
        )}
      </div>
    </div>
  ) : (
    <EmptyWishListProducts />
  );
};

export default WishListProducts;

export const EmptyWishListProducts = () => {
  return (
    <div className="flex justify-center flex-col items-center h-96">
      <div className="text-2xl font-semibold">Add your first product</div>
      <Link to={"/"} className="btn mt-3 text-white">
        Go To Products
      </Link>
    </div>
  );
};
