import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const Quantity = ({ product, handleQuantityChange }) => {
  const [quantity, setQuantity] = useState(product?.quantity);

  const handleQuantity = (type) => {
    if (type === "INC" && quantity < product?.stock) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      handleQuantityChange(product._id, newQuantity);
    } else if (type === "DEC" && quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      handleQuantityChange(product._id, newQuantity);
    }
  };
  return (
    <>
      <span>Quantity</span>
      <div className="flex">
        <FaMinus
          className="border w-[30px] h-[35px] p-[7px] cursor-pointer"
          onClick={() => handleQuantity("DEC")}
        />
        <span className="w-[40px] h-[35px] font-semibold select-none border text-lg flex items-center justify-center">
          {quantity}
        </span>

        <FaPlus
          className="border w-[30px] h-[35px] p-[7px] cursor-pointer"
          onClick={() => handleQuantity("INC")}
        />
      </div>
    </>
  );
};

export default Quantity;
