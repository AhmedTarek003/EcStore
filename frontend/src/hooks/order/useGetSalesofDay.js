import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { orderActions } from "../../redux/slices/orderSlice";
import { request } from "../../utils/request";

const useGetSalesofDay = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getSales = async () => {
      try {
        const { data } = await request.get("/api/orders/get_sales_of_day", {
          withCredentials: true,
        });
        dispatch(orderActions.getSalesPerDay(...data));
      } catch (error) {
        console.log(error);
      }
    };
    getSales();
  }, [dispatch]);
};

export default useGetSalesofDay;
