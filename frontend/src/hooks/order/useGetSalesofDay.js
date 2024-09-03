import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { orderActions } from "../../redux/slices/orderSlice";

const useGetSalesofDay = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getSales = async () => {
      try {
        const { data } = await axios.get("/api/orders/get_sales_of_day", {
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
