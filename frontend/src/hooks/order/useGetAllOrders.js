import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { orderActions } from "../../redux/slices/orderSlice";
import { request } from "../../utils/request";

const useGetAllOrders = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getOrders = async () => {
      setLoading(true);
      try {
        const { data } = await request.get("/api/orders", {
          withCredentials: true,
        });
        dispatch(orderActions.getAllOrders(data));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getOrders();
  }, [dispatch]);
  return { loading };
};

export default useGetAllOrders;
