import { useState } from "react";
import toast from "react-hot-toast";
import { request } from "../../utils/request";

const useUpdateCategory = () => {
  const [loading, setLoading] = useState(false);

  const update = async ({ category }, id) => {
    const success = handleInputsError({ category });
    if (!success) return;
    setLoading(true);
    try {
      await request.put(
        `/api/categories/${id}`,
        { category },
        { withCredentials: true }
      );
      toast.success("category updated successfully");
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };
  return { update, loading };
};

export default useUpdateCategory;

function handleInputsError({ category }) {
  if (!category) {
    toast.error("add category");
    return false;
  }
  return true;
}
