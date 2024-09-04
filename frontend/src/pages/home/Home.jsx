import { useSelector } from "react-redux";
import Categories from "../../components/categories/Categories";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/header/Header";
import Products from "../../components/products/Products";
import Slider from "../../components/slider/Slider";
import useGetAllProducts from "../../hooks/product/useGetAllProducts";
import { useState } from "react";

const Home = () => {
  const { products } = useSelector((state) => state.product);
  const [currentPage, setCurrentPage] = useState(1);
  const { loading } = useGetAllProducts(currentPage);

  return (
    <div>
      <Header />
      <Slider />
      {/* <Categories /> */}
      <Products
        getProducts={products}
        loading={loading}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pagination={true}
      />
      <Footer />
    </div>
  );
};

export default Home;
