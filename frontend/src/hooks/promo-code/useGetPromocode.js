import { useDispatch } from "react-redux";
import { promoCodeActions } from "../../redux/slices/promocodeSlice";
import toast from "react-hot-toast";
import { useState } from "react";
import { request } from "../../utils/request";

const useGetPromocode = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const getPromoCode = async (promoCode) => {
    const success = handleInputErrors(promoCode);
    if (!success) return;
    setLoading(true);
    try {
      const { data } = await request.post(
        `/api/promocode/get_promo_code`,
        { promoCode },
        {
          withCredentials: true,
        }
      );
      dispatch(promoCodeActions.getPromoCode(data));
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };
  return { getPromoCode, loading };
};

export default useGetPromocode;

function handleInputErrors(promoCode) {
  if (!promoCode) {
    toast.error("add promo code first");
    return false;
  }
  return true;
}
