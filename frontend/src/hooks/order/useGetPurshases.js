import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { orderActions } from "../../redux/slices/orderSlice";
import { request } from "../../utils/request";

const useGetPurshases = (purshasesIds) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const purshase = async (id) => {
      setLoading(true);
      try {
        const { data } = await request.get(`/api/orders/${id}`, {
          withCredentials: true,
        });
        dispatch(orderActions.getAllPurshases(data));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    for (let i in purshasesIds) {
      purshase(purshasesIds[i]);
    }
  }, [dispatch, purshasesIds]);
  return { loading };
};

export default useGetPurshases;
