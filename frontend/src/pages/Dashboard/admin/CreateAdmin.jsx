import { useState } from "react";
import { IoIosCamera } from "react-icons/io";
import DashboardHeader from "../../../components/header/DashBoardHeader";
import useCreateAdmin from "../../../hooks/auth/useCreateAdmin";

const CreateAdmin = () => {
  const { create, loading } = useCreateAdmin();

  const [inputs, setInputs] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    admin: true,
  });
  const [image, setImage] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    await create({ ...inputs, image });
  };
  return (
    <>
      <DashboardHeader />
      <div className=" p-3  flex flex-col justify-center items-center">
        <div className="bg-black p-5 rounded-md bg-clip-padding shadow-lg backdrop-blur-lg bg-opacity-0">
          <h2 className="text-4xl font-semibold mb-5 text-blue-800 text-center">
            Create New Admin
          </h2>
          <div className="relative w-20 h-20 mx-auto">
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
              }
              alt=""
              className="rounded-full w-full h-full object-cover"
            />
            <label
              htmlFor="admin_image"
              className="absolute bottom-0 right-0 cursor-pointer"
            >
              <IoIosCamera size={23} color="#333" />
            </label>
            <input
              type="file"
              id="admin_image"
              className="hidden"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <form className="flex flex-col" onSubmit={submitHandler}>
            <div className="flex flex-col w-96 max-sm:w-[100%]">
              <label className="label text-slate-700 font-semibold">
                full name
              </label>
              <input
                type="text"
                placeholder="enter your full name"
                className="bg-slate-100 input-md input  border-2 focus:border-blue-800 placeholder:text-slate-600"
                value={inputs.fullname}
                onChange={(e) => {
                  setInputs({
                    ...inputs,
                    fullname: e.target.value,
                  });
                }}
              />
            </div>
            <div className="flex flex-col w-96 max-sm:w-[100%]">
              <label className="label text-slate-700 font-semibold">
                email
              </label>
              <input
                type="email"
                placeholder="enter your email"
                className="bg-slate-100 input-md input  border-2 focus:border-blue-800 placeholder:text-slate-600"
                value={inputs.email}
                onChange={(e) => {
                  setInputs({
                    ...inputs,
                    email: e.target.value,
                  });
                }}
              />
            </div>
            <div className="flex flex-col w-96 max-sm:w-[100%]">
              <label className="label text-slate-700 font-semibold">
                phone number
              </label>
              <input
                type="number"
                placeholder="enter your phone number"
                className="bg-slate-100 input-md input  border-2 focus:border-blue-800 placeholder:text-slate-600"
                value={inputs.phoneNumber}
                onChange={(e) => {
                  setInputs({
                    ...inputs,
                    phoneNumber: e.target.value,
                  });
                }}
              />
            </div>
            <div className="flex flex-col w-96 max-sm:w-[100%]">
              <label className="label text-slate-700 font-semibold">
                password
              </label>
              <input
                type="password"
                placeholder="enter your password"
                className="bg-slate-100 input-md input  border-2 focus:border-blue-800 placeholder:text-slate-600"
                value={inputs.password}
                onChange={(e) => {
                  setInputs({
                    ...inputs,
                    password: e.target.value,
                  });
                }}
              />
            </div>
            <div className="flex flex-col w-96 max-sm:w-[100%]">
              <label className="label text-slate-700 font-semibold">
                confirm password
              </label>
              <input
                type="password"
                placeholder="confirm your password"
                className="bg-slate-100 input-md input  border-2 focus:border-blue-800 placeholder:text-slate-600"
                value={inputs.confirmPassword}
                onChange={(e) => {
                  setInputs({
                    ...inputs,
                    confirmPassword: e.target.value,
                  });
                }}
              />
            </div>
            <button
              className="btn btn-primary text-white text-lg btn-wide m-auto mt-3"
              disabled={loading}
            >
              {loading ? (
                <div className="loading loading-spinner"></div>
              ) : (
                "Create"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateAdmin;
