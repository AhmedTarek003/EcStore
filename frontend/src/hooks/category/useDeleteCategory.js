import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { categoryActions } from "../../redux/slices/categorySlice";
import { request } from "../../utils/request";

const useUpdateCategory = () => {
  const dispatch = useDispatch();
  const deleteCate = async (id) => {
    try {
      const { data } = await request.delete(`/api/categories/${id}`, {
        withCredentials: true,
      });
      dispatch(categoryActions.deletecategory(data?._id));
      toast.success("category deleted successfully");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  return { deleteCate };
};

export default useUpdateCategory;
