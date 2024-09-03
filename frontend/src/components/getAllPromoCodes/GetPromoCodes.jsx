import { CgMenuBoxed } from "react-icons/cg";
import { useSelector } from "react-redux";
import { useGetAllPromoCode } from "../../hooks/promo-code/useGetAllPromoCode";
import { useState } from "react";

const GetPromoCodes = () => {
  const { promoCodes } = useSelector((state) => state.promocode);
  const [open, setOpen] = useState(false);
  useGetAllPromoCode();
  return (
    <div className="relative">
      <div className="group inline-block">
        <CgMenuBoxed
          size={40}
          color={open ? "blue" : ""}
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
        />
        <div
          className="absolute bottom-[90%] right-[50%] w-[180px] hidden group-hover:block
          bg-gray-500 shadow-lg text-white p-2 rounded"
        >
          suggest promo codes
        </div>
      </div>
      {open && (
        <div className="absolute bg-slate-200 w-[300px] right-0 top-[80%] h-[200px] p-2 rounded-lg overflow-auto shadow-lg">
          {promoCodes?.map((promocode) => (
            <div key={promocode?._id}>
              <div className="bg-white my-2 p-2">{promocode?.promoCode}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetPromoCodes;
