import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import Product from "./pages/productItem/Product";
import Cart from "./pages/cart/Cart";
import NotFound from "./pages/notFound/NotFound";
import UserInfo from "./pages/userInfo/UserInfo";
import WishList from "./pages/wishList/WishList";
import Categories from "./pages/categories/Categories";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreateAdmin from "./pages/Dashboard/admin/CreateAdmin";
import GetAllAdmins from "./pages/Dashboard/admin/GetAllAdmins";
import AllCategories from "./pages/Dashboard/categories/AllCategories";
import CreateCategory from "./pages/Dashboard/categories/CreateCategory";
import UpdateCategory from "./pages/Dashboard/categories/UpdateCategory";
import AllPromoCodes from "./pages/Dashboard/promoCode/AllPromoCodes";
import CreatePromoCode from "./pages/Dashboard/promoCode/CreatePromoCode";
import CreateProduct from "./pages/Dashboard/product/CreateProduct";
import UpdateProduct from "./pages/Dashboard/product/UpdateProduct";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import ScrollTop from "./utils/ScrollTop";
import Success from "./pages/strip/Success";
import Cancel from "./pages/strip/Cancel";
import ProductOutStock from "./pages/Dashboard/product/ProductOutStock";
import Purshses from "./pages/Dashboard/purshses/Purshses";
import PurshasesHis from "./pages/purshasesHistory/PurshasesHis";
import useAuthUser from "./hooks/auth/useAuthUser";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  const { authUser } = useAuthContext();
  const { loading } = useAuthUser();
  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <BrowserRouter>
        <ScrollTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={authUser ? <Navigate to={"/"} /> : <Login />}
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to={"/"} /> : <Signup />}
          />
          <Route
            path="/userInfo/:id"
            element={
              <ProtectedRoute>
                <UserInfo />
              </ProtectedRoute>
            }
          />
          <Route path="/products/:id" element={<Product />} />
          <Route
            path="/user/wishlist"
            element={
              <ProtectedRoute>
                <WishList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/purshaseshistory"
            element={
              <ProtectedRoute>
                <PurshasesHis />
              </ProtectedRoute>
            }
          />
          <Route path="/categories/:category" element={<Categories />} />
          <Route path="/cart" element={<Cart />} />

          {authUser?.isAdmin && (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/admin_dashboard/all_admins"
                element={<GetAllAdmins />}
              />
              <Route
                path="/admin_dashboard/create_new_admin"
                element={<CreateAdmin />}
              />

              <Route
                path="/admin_dashboard/all_categories"
                element={<AllCategories />}
              />
              <Route
                path="/admin_dashboard/create_new_category"
                element={<CreateCategory />}
              />
              <Route
                path="/admin_dashboard/update_category/:id"
                element={<UpdateCategory />}
              />
              <Route
                path="/admin_dashboard/all_promo_code"
                element={<AllPromoCodes />}
              />
              <Route
                path="/admin_dashboard/create_new_promocode"
                element={<CreatePromoCode />}
              />
              <Route
                path="/admin_dashboard/products_out_of_stock"
                element={<ProductOutStock />}
              />
              <Route
                path="/admin_dashboard/create_new_product"
                element={<CreateProduct />}
              />
              <Route
                path="/admin_dashboard/update_product/:id"
                element={<UpdateProduct />}
              />

              <Route
                path="/admin_dashboard/get_purshses"
                element={<Purshses />}
              />
            </>
          )}
          <Route path="/payment/success" element={<Success />} />
          <Route path="/payment/cancel" element={<Cancel />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
