import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const cookie = Cookies.get("at");
  const { authUser } = useAuthContext();

  if (authUser === null && cookie) {
    return <div>Loading...</div>;
  }

  return authUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
