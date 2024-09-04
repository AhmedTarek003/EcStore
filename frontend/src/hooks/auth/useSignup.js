import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { request } from "../../utils/request";

const useSignup = () => {
  const [loading, setloading] = useState();
  const { setAuthUser } = useAuthContext();
  const signup = async ({
    fullname,
    email,
    phoneNumber,
    password,
    confirmPassword,
  }) => {
    const success = handleInputsError({
      fullname,
      email,
      phoneNumber,
      password,
      confirmPassword,
    });
    if (!success) return;
    setloading(true);
    try {
      const { data } = await request.post(
        "/api/auth/signup",
        {
          fullname,
          email,
          phoneNumber,
          password,
        },
        { withCredentials: true }
      );
      setAuthUser(data);
      localStorage.setItem("l", true);
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.msg || error.response.data.err);
    } finally {
      setloading(false);
    }
  };
  return { signup, loading };
};

export default useSignup;

function handleInputsError({
  fullname,
  email,
  phoneNumber,
  password,
  confirmPassword,
}) {
  if (!fullname || !email || !phoneNumber || !password || !confirmPassword) {
    toast.error("please fill all fields");
    return false;
  }
  if (password.length < 6) {
    toast.error("password must be at least 6 characters");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("passwords do not match");
    return false;
  }
  return true;
}
