import axios from "axios";
import toast from "react-hot-toast";

const useMakeOrder = () => {
  const makeOrder = async (order) => {
    try {
      await axios.post("/api/orders", { order }, { withCredentials: true });
      toast.success("order created successfully");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  return { makeOrder };
};

export default useMakeOrder;
