import axios from "axios";
// import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";

const useToggleLikesProduct = () => {
  const { setAuthUser } = useAuthContext();

  const likedProduct = async (productId) => {
    try {
      const { data } = await axios.put(
        `/api/users/${productId}/favorite_Products`,
        {},
        { withCredentials: true }
      );
      setAuthUser(data);
    } catch (error) {
      console.log(error);
    }
  };
  return { likedProduct };
};

export default useToggleLikesProduct;
