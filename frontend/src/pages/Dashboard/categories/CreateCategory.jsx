import { useState } from "react";
import DashboardHeader from "../../../components/header/DashBoardHeader";
import useCreateCategory from "../../../hooks/category/useCreateCategory";

const CreateCategory = () => {
  const [category, setCategory] = useState("");

  const { loading, create } = useCreateCategory();

  const submitHandler = (e) => {
    e.preventDefault();
    create(category);
  };
  return (
    <>
      <DashboardHeader />
      <div className=" p-3  flex flex-col justify-center items-center">
        <div className="bg-black p-5 rounded-md bg-clip-padding shadow-lg backdrop-blur-lg bg-opacity-0">
          <h2 className="text-4xl font-semibold mb-5 text-blue-800 text-center">
            Create New Category
          </h2>

          <form className="flex flex-col" onSubmit={submitHandler}>
            <div className="flex flex-col w-96 max-sm:w-[100%]">
              <label className="label text-slate-700 font-semibold">
                Category
              </label>
              <input
                type="text"
                placeholder="enter your category"
                className="bg-slate-100 input-md input  border-2 focus:border-blue-800 placeholder:text-slate-600"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
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

export default CreateCategory;
