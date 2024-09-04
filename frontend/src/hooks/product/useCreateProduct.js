import { useState } from "react";
import toast from "react-hot-toast";
import { request } from "../../utils/request";

const useCreateProduct = () => {
  const [loading, setLoading] = useState(false);

  const create = async ({
    productName,
    category,
    price,
    stock,
    discountPrice,
    colors,
    size,
    images,
  }) => {
    const success = handleInputErrors({
      productName,
      category,
      price,
      stock,
      discountPrice,
      colors,
      size,
      images,
    });
    if (!success) return;
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("discountPrice", discountPrice);
    colors.forEach((color) => {
      formData.append("colors", color);
    });
    size.forEach((size) => {
      formData.append("size", size);
    });
    images.forEach((image) => {
      formData.append("images", image);
    });
    setLoading(true);
    try {
      await request.post("/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      toast.success("product created successfully");
    } catch (error) {
      toast.error(error.response.data.msg || error.response.data.err);
    } finally {
      setLoading(false);
    }
  };
  return { loading, create };
};

export default useCreateProduct;

function handleInputErrors({ productName, category, price, stock, images }) {
  if (!productName || !category || !price || !stock || !images) {
    toast.error("fill required fields");
    return false;
  }
  return true;
}
