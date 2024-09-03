import ProductItem from "./ProductItem";
import Pagination from "../pagination/Pagination";

const Products = ({
  getProducts,
  loading,
  currentPage,
  setCurrentPage,
  pagination,
}) => {
  const products = getProducts?.products;
  const pages = getProducts?.pages;

  return (
    <div>
      {products?.length <= 0 ? (
        <div className="text-center h-40 flex justify-center items-center text-[red] font-bold text-2xl">
          No Products
        </div>
      ) : (
        <>
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="loading loading-spinner"></div>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap my-3 gap-2 p-3 justify-center">
                {products?.map((product) => (
                  <ProductItem key={product?._id} product={product} />
                ))}
              </div>
              {pagination && (
                <div className="text-center my-5">
                  <Pagination
                    pages={pages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Products;
