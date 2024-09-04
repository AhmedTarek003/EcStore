import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { productActions } from "../../redux/slices/productSlice";
import { request } from "../../utils/request";

const useGetProduct = (id) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const product = async () => {
      setLoading(true);
      try {
        const { data } = await request.get(`/api/products/${id}`, {
          withCredentials: true,
        });
        dispatch(productActions.getproduct(data));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    product();
  }, [dispatch, id]);
  return { loading };
};

export default useGetProduct;
