import { useAuthContext } from "../../context/AuthContext";
import { request } from "../../utils/request";

const useToggleLikesProduct = () => {
  const { setAuthUser } = useAuthContext();

  const likedProduct = async (productId) => {
    try {
      const { data } = await request.put(
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
