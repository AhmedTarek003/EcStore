import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { orderActions } from "../../redux/slices/orderSlice";
import { request } from "../../utils/request";

const useGetSales = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getSales = async () => {
      try {
        const { data } = await request.get("/api/orders/get_sales", {
          withCredentials: true,
        });
        dispatch(orderActions.getAllSales(data));
      } catch (error) {
        console.log(error);
      }
    };
    getSales();
  }, [dispatch]);
};

export default useGetSales;
