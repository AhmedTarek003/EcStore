import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { categoryActions } from "../../redux/slices/categorySlice";

const useGetCategory = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const category = async () => {
      try {
        const { data } = await axios.get(`/api/categories/${id}`, {
          withCredentials: true,
        });
        dispatch(categoryActions.getCategory(data));
      } catch (error) {
        console.log(error);
      }
    };
    category();
  }, [id, dispatch]);
};

export default useGetCategory;
