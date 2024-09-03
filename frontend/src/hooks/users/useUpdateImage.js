import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useState } from "react";

const useUpdateImage = () => {
  const [loadingPic, setloadingPic] = useState();
  const { setAuthUser, authUser } = useAuthContext();
  const updatePic = async (image) => {
    const success = handleInputsError({
      image,
    });
    const formData = new FormData();
    formData.append("image", image);
    if (!success) return;
    setloadingPic(true);
    try {
      const { data } = await axios.put(
        `/api/users/user_pic/${authUser?._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data'" },
          withCredentials: true,
        }
      );
      setAuthUser(data);
      toast.success("updated successfully");
    } catch (error) {
      toast.error(error.response.data.msg || error.response.data.err);
    } finally {
      setloadingPic(false);
    }
  };
  return { updatePic, loadingPic };
};

export default useUpdateImage;

function handleInputsError({ image }) {
  if (!image) {
    toast.error("no file found");
    return false;
  }
  return true;
}
