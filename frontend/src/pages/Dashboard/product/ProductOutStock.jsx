import { useSelector } from "react-redux";
import useGetAllProducts from "../../../hooks/product/useGetAllProducts";
import ProductItem from "../../../components/products/ProductItem";
import Header from "../../../components/header/Header";

const ProductOutStock = () => {
  const { loading } = useGetAllProducts("-", "all");
  const { products } = useSelector((state) => state.product);
  const productOutstock = products?.products?.filter((p) => p.stock <= 0);
  return (
    <div>
      {productOutstock?.length <= 0 ? (
        <div className="text-center h-40 flex justify-center items-center text-[red] font-bold text-2xl">
          No Products
        </div>
      ) : (
        <>
          <Header />
          <div className="text-center mx-auto my-5 border-b-2 w-fit m text-5xl text-gray-600">
            Products Out Of Stock
          </div>
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="loading loading-spinner"></div>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap my-3 gap-2 p-3 justify-center">
                {productOutstock?.map((product) => (
                  <ProductItem key={product?._id} product={product} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ProductOutStock;
