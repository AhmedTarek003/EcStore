import { useEffect, useState } from "react";
import style from "./header.module.css";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { RiMenu3Fill } from "react-icons/ri";
import MenuBar from "./MenuBar";
import { FaShoppingCart } from "react-icons/fa";
import Overlay from "./Overlay";
import { useAuthContext } from "../../context/AuthContext";
import Search from "./Search";
import { useSelector } from "react-redux";

const Header = () => {
  const [search, setSearch] = useState("");
  const [menu, setMenu] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(search);
  };
  useEffect(() => {
    if (menu) {
      document.body.classList.add("no_scroll");
    } else {
      document.body.classList.remove("no_scroll");
    }
  }, [menu]);

  const { authUser } = useAuthContext();
  return (
    <div className="shadow-sm p-3 flex items-center justify-between">
      <Link
        to={"/"}
        className="text-2xl max-sm:text-lg font-semibold select-none"
      >
        EcStore
      </Link>
      <form className="relative select-none" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="search..."
          className={` w-96 max-sm:w-32 max-sm:input-sm rounded-full bg-slate-100 border-2 focus:border-slate-300 outline-none ${style.search}`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FiSearch className="absolute right-5 top-3 max-sm:top-[10px] max-sm:text-[15px] text-gray-400 text-lg" />
        <Search search={search} />
      </form>
      {authUser ? (
        <div className="flex items-center gap-4 mr-5 relative">
          <div className="text-lg font-semibold select-none max-sm:hidden">
            {authUser?.fullname?.split(" ")[0]}
          </div>
          <Link to={"/cart"} className="relative cursor-pointer">
            <FaShoppingCart size={27} />
            {cart?.length > 0 && (
              <span
                className="absolute -top-[10px] -right-[10px] z-10 bg-[red] text-white w-[23px] h-[23px] font-semibold
              flex justify-center items-center rounded-full"
              >
                {cart.length}
              </span>
            )}
          </Link>
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
        <Link to={"/login"} className={style.btn}>
          Login
        </Link>
      )}
    </div>
  );
};

export default Header;
