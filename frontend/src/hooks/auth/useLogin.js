import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";
import { request } from "../../utils/request";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async ({ emailOrphoneNumber, password }) => {
    const success = handleInputsError({ emailOrphoneNumber, password });
    if (!success) return;
    setLoading(true);
    try {
      const { data } = await request.post(
        "/api/auth/login",
        {
          emailOrphoneNumber,
          password,
        },
        { withCredentials: true }
      );
      // console.log(data);
      localStorage.setItem("l", true);
      setAuthUser(data);
      // window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };
  return { login, loading };
};

function handleInputsError({ emailOrphoneNumber, password }) {
  if (!emailOrphoneNumber || !password) {
    toast.error("fill all fields");
    return false;
  }

  return true;
}

export default useLogin;
