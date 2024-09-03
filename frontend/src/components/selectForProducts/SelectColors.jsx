import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

const SelectColors = ({ selectColors, setSelectColros }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [currentColor, setCurrentColor] = useState("#fff");

  useEffect(() => {
    if (selectColors.length > 0) {
      setShowPicker(true);
    }
  }, [selectColors.length]);

  const addColor = () => {
    if (!selectColors.includes(currentColor)) {
      setSelectColros([...selectColors, currentColor]);
    }
  };

  const removeColor = (selectedColor) => {
    selectColors = selectColors.filter((color) => color !== selectedColor);
    setSelectColros(selectColors);
  };

  return (
    <div className="mt-3">
      <div>
        <div onClick={() => setShowPicker(!showPicker)} className="w-fit">
          {!showPicker ? (
            <div className="btn btn-error btn-sm text-[17px] text-white">
              Chosee Colors (optional)
            </div>
          ) : (
            <div className="btn btn-sm text-[17px] text-white">
              Close Colors
            </div>
          )}
        </div>
      </div>
      {showPicker && (
        <>
          <div className="flex items-center gap-1 mt-1">
            <input
              type="color"
              value={currentColor}
              onChange={(e) => setCurrentColor(e.target.value)}
            />
            <div className="btn btn-success text-white" onClick={addColor}>
              Add
            </div>
          </div>
          <div className="flex mt-5 gap-2 flex-wrap">
            {selectColors.map((color, idx) => (
              <div
                key={idx}
                className="bg-slate-100 w-16 px-2 py-1 rounded-lg flex justify-between items-center"
              >
                <span
                  className="block w-[20px] h-[20px] rounded-full"
                  style={{ backgroundColor: color }}
                ></span>
                <IoClose
                  size={22}
                  color="#777"
                  className="cursor-pointer"
                  onClick={() => removeColor(color)}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SelectColors;
