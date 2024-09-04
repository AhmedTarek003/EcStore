import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { request } from "../../utils/request";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();
  const logout = async () => {
    setLoading(true);
    try {
      await request.post("/api/auth/logout", "-", { withCredentials: true });
      setAuthUser(null);
      localStorage.removeItem("l");
      toast.success("logout successfully");
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { logout, loading };
};

export default useLogout;
