import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { request } from "../../utils/request";

const useAuthUser = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const { setAuthUser } = useAuthContext();

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      try {
        const { data } = await request.get("/api/users/get_user", {
          withCredentials: true,
        });
        setUser(data);
        setAuthUser(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    localStorage.getItem("l") && getUser();
  }, [setAuthUser]);

  return { loading, user };
};

export default useAuthUser;
