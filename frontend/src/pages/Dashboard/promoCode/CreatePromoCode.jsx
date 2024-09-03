import { useState } from "react";
import DashboardHeader from "../../../components/header/DashBoardHeader";
import useCreatePromoCode from "../../../hooks/promo-code/useCreatePromoCode";

const CreatePromoCode = () => {
  const [formValues, setFormValues] = useState({
    promoCode: "",
    discountPercent: "",
    expireDate: "",
  });

  const { loading, create } = useCreatePromoCode();

  const submitHandler = (e) => {
    e.preventDefault();
    create(formValues);
  };
  return (
    <>
      <DashboardHeader />
      <div className=" p-3  flex flex-col justify-center items-center">
        <div className="bg-black p-5 rounded-md bg-clip-padding shadow-lg backdrop-blur-lg bg-opacity-0">
          <h2 className="text-4xl font-semibold mb-5 text-blue-800 text-center">
            Create New Promo-Code
          </h2>

          <form className="flex flex-col" onSubmit={submitHandler}>
            <div className="flex flex-col w-96 max-sm:w-[100%]">
              <label className="label text-slate-700 font-semibold">
                promo-code
              </label>
              <input
                type="text"
                placeholder="enter your promo-code"
                className="bg-slate-100 input-md input  border-2 focus:border-blue-800 placeholder:text-slate-600"
                value={formValues.promoCode}
                onChange={(e) =>
                  setFormValues({ ...formValues, promoCode: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col w-96 max-sm:w-[100%]">
              <label className="label text-slate-700 font-semibold">
                discount percent
              </label>
              <input
                type="number"
                placeholder="enter your discount percentage"
                className="bg-slate-100 input-md input  border-2 focus:border-blue-800 placeholder:text-slate-600"
                value={formValues.discountPercent}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    discountPercent: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col w-96 max-sm:w-[100%]">
              <label className="label text-slate-700 font-semibold">
                expire date
              </label>
              <input
                type="date"
                className="bg-slate-100 input-md input  border-2 focus:border-blue-800 placeholder:text-slate-600"
                value={formValues.expireDate}
                onChange={(e) =>
                  setFormValues({ ...formValues, expireDate: e.target.value })
                }
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

export default CreatePromoCode;
