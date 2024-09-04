import { useEffect, useState } from "react";
import { request } from "../../utils/request";

const useGetWishListProducts = (productsId) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductById = async (id) => {
      try {
        const { data } = await request.get(`/api/products/${id}`);
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const fetchProducts = [];
        for (const id in productsId) {
          const product = await fetchProductById(id);
          if (product) {
            fetchProducts.push(product);
          }
        }
        setProducts(fetchProducts);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (productsId.length > 0) {
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [productsId]);
  return { products, loading };
};

export default useGetWishListProducts;
