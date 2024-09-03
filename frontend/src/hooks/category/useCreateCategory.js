import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useCreateCategory = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const create = async (category) => {
    const success = handleInputsError(category);
    if (!success) return;
    setLoading(true);
    try {
      await axios.post(
        "/api/categories",
        { category },
        { withCredentials: true }
      );
      toast.success("category created successfully");
      navigate("/admin_dashboard/all_categories");
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };
  return { create, loading };
};

export default useCreateCategory;

function handleInputsError(category) {
  if (!category) {
    toast.error("add category");
    return false;
  }
  return true;
}
