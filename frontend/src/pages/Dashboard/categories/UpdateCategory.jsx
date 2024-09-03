import { useEffect, useState } from "react";
import DashboardHeader from "../../../components/header/DashBoardHeader";
import { useParams } from "react-router-dom";
import useGetCategory from "../../../hooks/category/useGetCategory";
import { useSelector } from "react-redux";
import useUpdateCategory from "../../../hooks/category/useUpdateCategory";

const UpdateCategory = () => {
  const { id } = useParams();
  useGetCategory(id);
  const { category } = useSelector((state) => state.category);
  const initialValues = {
    category: category?.category,
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [disabledBtn, setDisabledBtn] = useState(true);

  useEffect(() => {
    if (category) {
      setFormValues({
        category: category?.category,
      });
    }
  }, [category]);

  const handleCahnges = (e) => {
    const { name, value } = e.target;
    const updatedValue = { ...initialValues, [name]: value || "" };
    setFormValues(updatedValue);
    const allFilled = Object.values(updatedValue).every(
      (field) => field.trim() !== ""
    );
    const valuesChanged = Object.keys(initialValues).some(
      (key) => initialValues[key].trim() !== updatedValue[key].trim()
    );
    setDisabledBtn(!allFilled || !valuesChanged);
  };
  const { update, loading } = useUpdateCategory();
  const submitHandler = (e) => {
    e.preventDefault();
    update(formValues, id);
    setDisabledBtn(true);
  };

  return (
    <>
      <DashboardHeader />
      <div className=" p-3 h-[calc(100vh-70px)] max-2xl:h-[calc(100vh-10px)] flex flex-col justify-center items-center">
        <div className="bg-black p-5 rounded-md bg-clip-padding shadow-lg backdrop-blur-lg bg-opacity-0">
          <h2 className="text-4xl font-semibold mb-5 text-blue-800 text-center">
            Update Category
          </h2>
          <form className="flex flex-col" onSubmit={submitHandler}>
            <div className="flex flex-col w-96 max-sm:w-[100%]">
              <label className="label text-slate-700 font-semibold">
                category
              </label>
              <input
                type="text"
                name="category"
                placeholder="enter your category"
                className="bg-slate-100 input-md input  border-2 focus:border-blue-800 placeholder:text-slate-600"
                value={formValues.category || ""}
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
                "Update"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateCategory;
