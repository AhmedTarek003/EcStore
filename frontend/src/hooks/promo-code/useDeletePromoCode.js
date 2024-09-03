import axios from "axios";
import { useDispatch } from "react-redux";
import { promoCodeActions } from "../../redux/slices/promocodeSlice";
import toast from "react-hot-toast";

const useDeletePromoCode = () => {
  const dispatch = useDispatch();
  const deletePromoCode = async (id) => {
    try {
      const { data } = await axios.delete(`/api/promocode/${id}`, {
        withCredentials: true,
      });
      dispatch(promoCodeActions.deletePromoCode(data?._id));
      toast.success("promo-code deleted successfully");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  return { deletePromoCode };
};

export default useDeletePromoCode;
