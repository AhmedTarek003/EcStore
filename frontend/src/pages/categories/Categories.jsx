import { useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/header/Header";
import Products from "../../components/products/Products";
import useGetAllProducts from "../../hooks/product/useGetAllProducts";
import { useParams } from "react-router-dom";
import { useState } from "react";

const Categories = () => {
  const { category } = useParams();
  const { products } = useSelector((state) => state.product);
  const { loading } = useGetAllProducts("-", category);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div>
      <Header />
      <Products
        getProducts={products}
        loading={loading}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pagination={false}
      />
      <Footer />
    </div>
  );
};

export default Categories;
