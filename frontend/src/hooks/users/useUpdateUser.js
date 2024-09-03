import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useState } from "react";

const useUpdateUser = (id) => {
  const [loading, setloading] = useState();
  const { setAuthUser } = useAuthContext();
  const update = async ({ fullname, email, phoneNumber, password }) => {
    const success = handleInputsError({
      fullname,
      email,
      phoneNumber,
      password,
    });
    if (!success) return;
    setloading(true);
    try {
      const { data } = await axios.put(
        `/api/users/${id}`,
        {
          fullname,
          email,
          phoneNumber,
          password,
        },
        { withCredentials: true }
      );
      setAuthUser(data);
      toast.success("updated successfully");
    } catch (error) {
      toast.error(error.response.data.msg || error.response.data.err);
    } finally {
      setloading(false);
    }
  };
  return { update, loading };
};

export default useUpdateUser;

function handleInputsError({ fullname, email, phoneNumber }) {
  if (!fullname || !email || !phoneNumber) {
    toast.error("please fill all fields");
    return false;
  }
  return true;
}
