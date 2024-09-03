import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { productActions } from "../../redux/slices/productSlice";

const useGetFavProducts = (productsId) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const product = async (id) => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/products/${id}`, {
          withCredentials: true,
        });
        dispatch(productActions.getFavProducts(data));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    for (let i in productsId) {
      product(productsId[i]);
    }
  }, [dispatch, productsId]);
  return { loading };
};

export default useGetFavProducts;
