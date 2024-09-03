import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const useAddReview = () => {
  const [loading, setLoading] = useState(false);

  const addReview = async (rating, id) => {
    const success = handleInputsError(rating);
    if (!success) return;
    setLoading(true);
    try {
      await axios.post(
        `/api/reviews/${id}/add_review`,
        { rating },
        { withCredentials: true }
      );
      toast.success("added review successfully");
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };
  return { addReview, loading };
};

export default useAddReview;

function handleInputsError(category) {
  if (!category) {
    toast.error("add your rate");
    return false;
  }
  return true;
}
