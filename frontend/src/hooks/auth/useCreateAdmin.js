import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { request } from "../../utils/request";

const useCreateAdmin = () => {
  const [loading, setloading] = useState();
  const navigate = useNavigate();
  const create = async ({
    fullname,
    email,
    phoneNumber,
    admin,
    password,
    confirmPassword,
    image,
  }) => {
    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("isAdmin", admin);
    formData.append("password", password);
    formData.append("image", image);

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
      await request.post(
        "/api/auth/signup",

        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      toast.success("admin created successfully");
      navigate("/admin_dashboard/all_admins");
    } catch (error) {
      toast.error(error.response.data.msg || error.response.data.err);
    } finally {
      setloading(false);
    }
  };
  return { create, loading };
};

export default useCreateAdmin;

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
