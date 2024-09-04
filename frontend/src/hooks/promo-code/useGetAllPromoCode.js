import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { promoCodeActions } from "../../redux/slices/promocodeSlice";
import { request } from "../../utils/request";

export const useGetAllPromoCode = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllPromoCode = async () => {
      try {
        const { data } = await request.get("/api/promocode", {
          withCredentials: true,
        });
        dispatch(promoCodeActions.getAllPromoCodes(data));
      } catch (error) {
        console.log(error);
      }
    };
    getAllPromoCode();
  }, [dispatch]);
};
