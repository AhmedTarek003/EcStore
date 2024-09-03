import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

const SelectSize = ({ selectSize, setSelectSize }) => {
  const [size] = useState("");
  const [openSize, setOpenSize] = useState(false);

  useEffect(() => {
    if (selectSize.length > 0) {
      setOpenSize(true);
    }
  }, [selectSize.length]);

  const sizeChangeHandler = (e) => {
    const options = e.target.options;
    const selectedValues = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    if (!selectSize.includes(...selectedValues))
      setSelectSize([...selectSize, ...selectedValues]);
  };

  const removeSize = (selectedSize) => {
    selectSize = selectSize.filter((size) => size !== selectedSize);
    setSelectSize(selectSize);
  };

  const sizes = [
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
    "3xl",
    "4xl",
    "5xl",
    "6xl",
    "7xl",
    "8xl",
    "9xl",
    "10xl",
  ];

  return (
    <div className="mt-5">
      <div>
        <div onClick={() => setOpenSize(!openSize)} className="w-fit">
          {!openSize ? (
            <div className="btn btn-success btn-sm text-[17px] text-white">
              Chosee Size (optional)
            </div>
          ) : (
            <div className="btn btn-sm text-[17px] text-white">Close Size</div>
          )}
        </div>
      </div>
      {openSize && (
        <>
          <select
            className="bg-slate-100 w-40 p-3 focus:outline-none mt-2"
            value={size}
            onChange={sizeChangeHandler}
          >
            <option value="" hidden>
              Select size
            </option>
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <div className="flex mt-5 gap-2 flex-wrap">
            {selectSize.map((size, idx) => (
              <div
                key={idx}
                className="bg-slate-100 w-16 px-2 py-1 rounded-lg flex justify-between items-center"
              >
                <span className="">{size}</span>
                <IoClose
                  size={22}
                  color="#777"
                  className="cursor-pointer"
                  onClick={() => removeSize(size)}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SelectSize;
