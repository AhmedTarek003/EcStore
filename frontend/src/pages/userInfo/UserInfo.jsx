import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { useAuthContext } from "../../context/AuthContext";
import useUpdateUser from "../../hooks/users/useUpdateUser";
import { IoIosCamera } from "react-icons/io";
import useUpdateImage from "../../hooks/users/useUpdateImage";
import { useParams } from "react-router-dom";
import NotFound from "../notFound/NotFound";

const UserInfo = () => {
  const { authUser } = useAuthContext();
  const { id } = useParams();
  const initialValues = {
    fullname: authUser?.fullname,
    email: authUser?.email,
    phoneNumber: authUser?.phoneNumber,
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (authUser) {
      setFormValues({
        fullname: authUser.fullname || "",
        email: authUser.email || "",
        phoneNumber: authUser.phoneNumber || "",
      });
    }
  }, [authUser]);

  useEffect(() => {
    if (image) {
      setDisabledBtn(false);
    }
  }, [image]);

  const handleCahnges = (e) => {
    const { name, value } = e.target;
    const updatedValue = { ...formValues, [name]: value || "" };
    setFormValues(updatedValue);
    const allFilled = Object.values(updatedValue).every(
      (field) => field.trim() !== ""
    );
    const valuesChanged = Object.keys(formValues).some(
      (key) => initialValues[key].trim() !== updatedValue[key].trim()
    );
    setDisabledBtn(!image && (!allFilled || !valuesChanged));
  };

  const { loading, update } = useUpdateUser(id);
  const { loadingPic, updatePic } = useUpdateImage();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      image &&
      initialValues["fullname"] === formValues["fullname"] &&
      initialValues["email"] === formValues["email"] &&
      initialValues["phoneNumber"] === formValues["phoneNumber"]
    ) {
      await updatePic(image);
      setImage(null);
    } else if (
      !image &&
      (initialValues["fullname"] !== formValues["fullname"] ||
        initialValues["email"] !== formValues["email"] ||
        initialValues["phoneNumber"] !== formValues["phoneNumber"])
    ) {
      await update(formValues);
    } else if (
      (image && initialValues["fullname"] !== formValues["fullname"]) ||
      initialValues["email"] !== formValues["email"] ||
      initialValues["phoneNumber"] !== formValues["phoneNumber"]
    ) {
      await update(formValues);
      await updatePic(image);
      setImage(null);
    }
  };
  return authUser?._id === id ? (
    <>
      <Header />
      <div className=" p-3 h-[calc(100vh-70px)] max-2xl:h-[calc(100vh-10px)] flex flex-col justify-center items-center">
        <div className="bg-black p-5 rounded-md bg-clip-padding shadow-lg backdrop-blur-lg bg-opacity-0">
          <h2 className="text-4xl font-semibold mb-5 text-blue-800">
            User Info
          </h2>
          {authUser?.isAdmin && (
            <div className="relative w-20 h-20 mx-auto">
              {loadingPic ? (
                <div className="loading loading-spinner"></div>
              ) : (
                <img
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : authUser?.profilePic?.url ||
                        "https://upload.wikimedia.org/wikipedia/commons/7/7…ofile_avatar_placeholder_large.png?20150327203541"
                  }
                  alt=""
                  className="rounded-full object-cover w-full h-full"
                />
              )}
              <label
                htmlFor="admin_image"
                className="absolute bottom-0 right-0 cursor-pointer"
              >
                <IoIosCamera size={27} />
              </label>
              <input
                type="file"
                id="admin_image"
                className="hidden"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
          )}
          <form className="flex flex-col" onSubmit={submitHandler}>
            <div className="flex flex-col w-96 max-sm:w-[100%]">
              <label className="label text-slate-700 font-semibold">
                full name
              </label>
              <input
                type="text"
                name="fullname"
                placeholder="enter your full name"
                className="bg-slate-100 input-md input  border-2 focus:border-blue-800 placeholder:text-slate-600"
                value={formValues.fullname || ""}
                onChange={handleCahnges}
              />
            </div>
            <div className="flex flex-col w-96 max-sm:w-[100%]">
              <label className="label text-slate-700 font-semibold">
                email
              </label>
              <input
                type="email"
                name="email"
                placeholder="enter your email"
                className="bg-slate-100 input-md input  border-2 focus:border-blue-800 placeholder:text-slate-600"
                value={formValues.email || ""}
                onChange={handleCahnges}
              />
            </div>
            <div className="flex flex-col w-96 max-sm:w-[100%]">
              <label className="label text-slate-700 font-semibold">
                phone number
              </label>
              <input
                type="number"
                name="phoneNumber"
                placeholder="enter your phone number"
                className="bg-slate-100 input-md input  border-2 focus:border-blue-800 placeholder:text-slate-600"
                value={formValues.phoneNumber || ""}
                onChange={handleCahnges}
              />
            </div>
            <button
              className="btn btn-primary text-white text-lg btn-wide my-3 mx-auto"
              disabled={disabledBtn}
            >
              {loading ? (
                <div className="loading loading-spinner"></div>
              ) : (
                " Update"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  ) : (
    <NotFound />
  );
};

export default UserInfo;
