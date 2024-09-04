import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { productActions } from "../../redux/slices/productSlice";

const useGetAllProducts = (currentPage, category) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllProducts = async () => {
      setLoading(true);
      try {
        // const { data } = await axios.get(
        //   `/api/products${
        //     currentPage && `?pageNumber=${currentPage}`
        //   }&category=${category ? category : "all"}`,
        //   {
        //     withCredentials: true,
        //   }
        // );
        const { data } = await axios.get(
          `https://ec-store-beta.vercel.app/api/products?pageNumber=1&category=all`
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
