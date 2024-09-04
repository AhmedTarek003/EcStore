import toast from "react-hot-toast";
import { request } from "../../utils/request";

const useMakeOrder = () => {
  const makeOrder = async (order) => {
    try {
      await request.post("/api/orders", { order }, { withCredentials: true });
      toast.success("order created successfully");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  return { makeOrder };
};

export default useMakeOrder;
