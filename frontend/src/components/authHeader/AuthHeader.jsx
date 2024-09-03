import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

const AuthHeader = () => {
  return (
    <div className=" p-3 flex justify-around items-center shadow-md">
      <div className="text-2xl font-semibold">EcStore</div>
      <div>
        <Link
          to={"/"}
          className="text-blue-500 flex items-center gap-1 hover:text-blue-800"
        >
          <FaArrowLeftLong className="mt-[2px]" />
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default AuthHeader;
