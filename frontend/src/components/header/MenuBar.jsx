import { MdOutlineLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import useLogout from "../../hooks/auth/useLogout";
import { useAuthContext } from "../../context/AuthContext";

const MenuBar = () => {
  const { logout, loading } = useLogout();
  const { authUser } = useAuthContext();

  return (
    <div className="absolute bg-slate-100 shadow-lg h-[400vh] w-[250px] -top-5 -right-8 z-50 select-none">
      <div className="bg-[#2575ee] text-white p-3 text-xl text-center rounded-md">
        Hello {authUser?.fullname?.split(" ")[0]}
      </div>
      <div className="p-3">
        <ul className="flex flex-col gap-3 text-[18px] font-semibold">
          <Link
            to={`/userInfo/${authUser?._id}`}
            className="hover:text-gray-600 w-fit"
          >
            Profile
          </Link>
          <Link to={"/user/wishlist"} className="hover:text-gray-600 w-fit">
            WishList
          </Link>
          <Link
            to={"/user/purshaseshistory"}
            className="hover:text-gray-600 w-fit"
          >
            Purshases History
          </Link>
        </ul>
        <div className="divider mt-5"></div>
        <div>
          {authUser?.isAdmin && (
            <ul className="flex flex-col gap-3 text-[18px] font-semibold">
              <p className="mt-3 uppercase tracking-wider text-gray-500">
                Admin
              </p>
              <Link to={"/dashboard"} className="hover:text-gray-600 w-fit">
                Dashboard
              </Link>
              <div className="md:hidden flex flex-col gap-3">
                <Link
                  to={"/admin_dashboard/all_categories"}
                  className="font-semibold text-[17px] hover:text-gray-500 w-fit"
                >
                  Categories
                </Link>
                <Link
                  to={"/admin_dashboard/all_admins"}
                  className="font-semibold text-[17px] hover:text-gray-500 w-fit"
                >
                  All admins
                </Link>
                <Link
                  to={"/admin_dashboard/products_out_of_stock"}
                  className="font-semibold text-[17px] hover:text-gray-500 w-fit"
                >
                  product out of stock
                </Link>
                <Link
                  to={"/admin_dashboard/create_new_product"}
                  className="font-semibold text-[17px] hover:text-gray-500 w-fit"
                >
                  Create new product
                </Link>
                <Link
                  to={"/admin_dashboard/create_promo_code"}
                  className="font-semibold text-[17px] hover:text-gray-500 w-fit"
                >
                  All Promo Code
                </Link>
                <Link
                  to={"/admin_dashboard/get_purshses"}
                  className="font-semibold text-[17px] hover:text-gray-500 w-fit"
                >
                  Purshses Orders
                </Link>
              </div>
              <div className="divider"></div>
            </ul>
          )}
        </div>
        {loading ? (
          <div className="loading loading-spinner"></div>
        ) : (
          <div
            className="flex items-center gap-2 cursor-pointer text-[red] font-bold mt-5 text-xl"
            onClick={logout}
          >
            Logout <MdOutlineLogout />
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuBar;
