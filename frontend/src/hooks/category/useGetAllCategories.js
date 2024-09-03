import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { categoryActions } from "../../redux/slices/categorySlice";

const useGetAllCategories = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllCategories = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/categories", {
          withCredentials: true,
        });
        dispatch(categoryActions.getAllCategories(data));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getAllCategories();
  }, [dispatch]);
  return { loading };
};

export default useGetAllCategories;
