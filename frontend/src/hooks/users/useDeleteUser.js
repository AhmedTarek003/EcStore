import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/slices/userSlice";
import { request } from "../../utils/request";

const useDeleteUser = () => {
  const dispatch = useDispatch();

  const deleteUser = async (_id) => {
    console.log(_id);
    try {
      const { data } = await request.delete(`/api/users/${_id}`, {
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
