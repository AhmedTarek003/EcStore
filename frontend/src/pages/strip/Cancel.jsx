import { MdClose } from "react-icons/md";

const Cancel = () => {
  return (
    <div className=" mt-10 text-center w-full">
      <div className="w-16 h-16 rounded-full bg-red-600 flex justify-center items-center m-auto">
        <MdClose size={35} color="white" />
      </div>
      <div className="text-2xl font-bold">Something is wrong!</div>
    </div>
  );
};

export default Cancel;
