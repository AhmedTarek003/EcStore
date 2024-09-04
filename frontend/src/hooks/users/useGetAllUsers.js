import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/slices/userSlice";
import { request } from "../../utils/request";

const useGetAllUsers = () => {
  const [loading, setLoading] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const { data } = await request.get("/api/users", {
          withCredentials: true,
        });
        dispatch(userActions.getAllUsers(data));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getAllUsers();
  }, [dispatch]);
  return { loading };
};

export default useGetAllUsers;
