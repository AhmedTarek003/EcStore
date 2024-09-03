import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();
  const logout = async () => {
    setLoading(true);
    try {
      await axios.post("/api/auth/logout", "-", { withCredentials: true });
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
