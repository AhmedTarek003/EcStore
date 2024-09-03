import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/slices/userSlice";

const useDeleteUser = () => {
  const dispatch = useDispatch();

  const deleteUser = async (_id) => {
    console.log(_id);
    try {
      const { data } = await axios.delete(`/api/users/${_id}`, {
        withCredentials: true,
      });
      dispatch(userActions.deleteUser(data?._id));
      toast.success("admin deleted successfully");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  return { deleteUser };
};

export default useDeleteUser;
