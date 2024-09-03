import { Link } from "react-router-dom";
import AuthHeader from "../../components/authHeader/AuthHeader";
import { useState } from "react";
import useLogin from "../../hooks/auth/useLogin";

const Login = () => {
  const [inputs, setInputs] = useState({
    emailOrphoneNumber: "",
    password: "",
  });

  const { login, loading } = useLogin();

  const submitHandler = async (e) => {
    e.preventDefault();
    await login(inputs);
  };

  return (
    <>
      <AuthHeader />
      <div className=" p-3 h-[calc(100vh-100px)] flex flex-col justify-center items-center">
        <div className="bg-black p-5 rounded-md bg-clip-padding shadow-lg backdrop-blur-lg bg-opacity-0">
          <h2 className="text-4xl font-semibold mb-5 text-blue-800">Login</h2>
          <form className="flex flex-col" onSubmit={submitHandler}>
            <div className="flex flex-col w-96 max-sm:w-[100%]">
              <label className="label text-slate-700 font-semibold">
                Email or Phone Number
              </label>
              <input
                type="text"
                placeholder="enter your email or phone number"
                className="bg-slate-100 input-md input  border-2 focus:border-blue-800 placeholder:text-slate-600"
                value={inputs.emailOrphoneNumber}
                onChange={(e) => {
                  setInputs({
                    ...inputs,
                    emailOrphoneNumber: e.target.value,
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
            <div className="my-3 font-semibold">
              <Link to={"/signup"} className="hover:text-blue-500">
                create new account ?
              </Link>
            </div>
            <button
              className="btn btn-primary text-white text-lg btn-wide m-auto"
              disabled={loading}
            >
              {loading ? (
                <div className="loading loading-spinner"></div>
              ) : (
                " Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
