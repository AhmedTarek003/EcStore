import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { request } from "../../utils/request";

const useDeleteProduct = () => {
  const [delLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      await request.delete(`/api/products/${id}`, {
        withCredentials: true,
      });
      toast.success("product deleted successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.msg || error.response.data.err);
    } finally {
      setLoading(false);
    }
  };
  return { delLoading, deleteProduct };
};

export default useDeleteProduct;
