import { useEffect, useState } from "react";
import style from "./header.module.css";
import { Link } from "react-router-dom";
import { RiMenu3Fill } from "react-icons/ri";
import MenuBar from "./MenuBar";
import Overlay from "./Overlay";
import { useAuthContext } from "../../context/AuthContext";

const DashboardHeader = () => {
  const { authUser } = useAuthContext();
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    if (menu) {
      document.body.classList.add("no_scroll");
    } else {
      document.body.classList.remove("no_scroll");
    }
  }, [menu]);

  const user = true;
  return (
    <div className="shadow-sm p-3 flex items-center justify-between">
      <Link
        to={"/"}
        className="text-2xl max-sm:text-lg font-semibold select-none"
      >
        EcStore
      </Link>
      {user ? (
        <div className="flex items-center gap-4 mr-5 relative">
          <div className="text-lg font-semibold select-none">
            {authUser?.fullname?.split(" ")[0]}
          </div>
          <RiMenu3Fill
            className={`text-2xl cursor-pointer text-gray-900 transition-all relative  ${
              menu ? "transform rotate-90" : ""
            }`}
            onClick={() => setMenu(true)}
          />
          {menu && (
            <>
              <Overlay setMenu={setMenu} />
              <MenuBar />
            </>
          )}
        </div>
      ) : (
        <button className={style.btn}>
          <Link to={"/login"}>Login</Link>
        </button>
      )}
    </div>
  );
};

export default DashboardHeader;
