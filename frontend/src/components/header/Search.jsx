import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useGetSearchProducts from "../../hooks/product/useGetSearchProducts.js";
import { Link } from "react-router-dom";

const Search = ({ search }) => {
  const [getSearch, setGetSearch] = useState("");
  useEffect(() => {
    if (search.trim() !== "") {
      setGetSearch(search);
    }
  }, [search]);
  useGetSearchProducts(getSearch);
  const { searchProducts } = useSelector((state) => state.product);
  const products = searchProducts.products;

  return (
    <>
      {search.trim() !== "" && (
        <div className="absolute z-50 w-full bg-slate-200 rounded-[20px] shadow-lg">
          {products?.length > 0 ? (
            products?.map((product) => (
              <div key={product?._id}>
                <Link
                  to={`/products/${product?._id}`}
                  className="flex items-center justify-between hover:bg-slate-100 h-[80px] p-2"
                >
                  <div>
                    <img
                      src={product?.productImages?.[0].url}
                      loading="lazy"
                      alt="product"
                      className="w-16"
                    />
                  </div>
                  <div className="font-semibold text-[20px]">
                    {product?.productName}
                  </div>
                </Link>
                <div className="divider m-0 p-0"></div>
              </div>
            ))
          ) : (
            <div className=" p-3">No products</div>
          )}
        </div>
      )}
    </>
  );
};

export default Search;
