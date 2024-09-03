import { useState } from "react";
import AuthHeader from "../../components/authHeader/AuthHeader";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/auth/useSignup";

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const { loading, signup } = useSignup();

  const submitHandler = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <>
      <AuthHeader />
      <div className=" p-3 h-[calc(100vh-70px)] max-2xl:h-[calc(100vh-10px)] flex flex-col justify-center items-center">
        <div className="bg-black p-5 rounded-md bg-clip-padding shadow-lg backdrop-blur-lg bg-opacity-0">
          <h2 className="text-4xl font-semibold mb-5 text-blue-800">Signup</h2>
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
            <div className="my-3 font-semibold">
              <Link to={"/login"} className="hover:text-blue-500">
                already have an account ?
              </Link>
            </div>
            <button
              className="btn btn-primary text-white text-lg btn-wide m-auto"
              disabled={loading}
            >
              {loading ? (
                <div className="loading loading-spinner"></div>
              ) : (
                "Signup"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
