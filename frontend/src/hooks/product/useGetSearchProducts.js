import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { productActions } from "../../redux/slices/productSlice";

const useGetSearchProducts = (search) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const { data } = await axios.get(
          `/api/products?pageNumber=1&search=${search ? search : "   "}`,
          {
            withCredentials: true,
          }
        );
        dispatch(productActions.getSearchProducts(data));
      } catch (error) {
        console.log(error);
      }
    };
    getAllProducts();
  }, [dispatch, search]);
};

export default useGetSearchProducts;
