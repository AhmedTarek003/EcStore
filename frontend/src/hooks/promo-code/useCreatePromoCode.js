import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useCreatePromoCode = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const create = async ({ promoCode, discountPercent, expireDate }) => {
    const success = handleInputsError({
      promoCode,
      discountPercent,
      expireDate,
    });
    if (!success) return;

    const [year, month, day] = expireDate.split("-");
    const expireAt = new Date(year, month - 1, day).toISOString();

    setLoading(true);
    try {
      await axios.post(
        "/api/promocode",
        { promoCode, discountPercent, expireAt },
        { withCredentials: true }
      );
      toast.success("promo-code created successfully");
      navigate("/admin_dashboard/all_promo_code");
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };
  return { create, loading };
};

export default useCreatePromoCode;

function handleInputsError({ promoCode, discountPercent, expireDate }) {
  if (!promoCode || !discountPercent || !expireDate) {
    toast.error("fill all fields");
    return false;
  }
  return true;
}
