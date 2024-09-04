import { useState } from "react";
import toast from "react-hot-toast";
import { request } from "../../utils/request";

const useUpdateProduct = () => {
  const [upLoading, setLoading] = useState(false);

  const update = async (
    { productName, category, price, stock, discountPrice, colors, size },
    id
  ) => {
    const success = handleInputErrors({
      productName,
      category,
      price,
      stock,
      discountPrice,
      colors,
      size,
    });
    if (!success) return;
    setLoading(true);
    try {
      await request.put(
        `/api/products/${id}`,
        {
          productName,
          category,
          price,
          stock,
          discountPrice,
          colors,
          size,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("product updated successfully");
    } catch (error) {
      toast.error(error.response.data.msg || error.response.data.err);
    } finally {
      setLoading(false);
    }
  };
  return { upLoading, update };
};

export default useUpdateProduct;

function handleInputErrors({ productName, category, price, stock }) {
  if (!productName || !category || !price || !stock) {
    toast.error("fill required fields");
    return false;
  }
  return true;
}
