import { CgClose } from "react-icons/cg";

const Overlay = ({ setMenu }) => {
  return (
    <div className="fixed top-0 left-0 w-[calc(100%-250px)] h-[400vh] bg-[#00000099] z-40">
      <CgClose
        className="absolute right-10 top-5 cursor-pointer"
        size={30}
        color="red"
        onClick={() => setMenu(false)}
      />
    </div>
  );
};

export default Overlay;
