import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { productActions } from "../../redux/slices/productSlice";
import { request } from "../../utils/request";

const useGetAllProducts = (currentPage, category) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllProducts = async () => {
      setLoading(true);
      try {
        const { data } = await request.get(
          `/api/products${
            currentPage && `?pageNumber=${currentPage}`
          }&category=${category ? category : "all"}`,
          {
            withCredentials: true,
          }
        );
        dispatch(productActions.getAllProducts(data));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getAllProducts();
  }, [dispatch, currentPage, category]);
  return { loading };
};

export default useGetAllProducts;
