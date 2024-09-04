import { useState } from "react";
import toast from "react-hot-toast";
import { request } from "../../utils/request";

const useUpdateProductImages = () => {
  const [imgLoading, setLoading] = useState(false);

  const updateImage = async (images, id) => {
    const success = handleInputErrors(images);
    if (!success) return;
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image);
    });
    setLoading(true);
    try {
      await request.put(`/api/products/update_product_img/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      toast.success("product Images updated successfully");
    } catch (error) {
      toast.error(error.response.data.msg || error.response.data.err);
    } finally {
      setLoading(false);
    }
  };
  return { imgLoading, updateImage };
};

export default useUpdateProductImages;

function handleInputErrors(images) {
  if (!images) {
    toast.error("fill required fields");
    return false;
  }
  return true;
}
