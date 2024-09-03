import Header from "../../components/header/Header";
import WishListProducts from "../../components/wishList/WishListProducts";
import { useAuthContext } from "../../context/AuthContext";

const WishList = () => {
  const { authUser } = useAuthContext();
  return (
    <>
      <Header />
      <WishListProducts productsId={authUser?.favoriteProducts} />
    </>
  );
};

export default WishList;
