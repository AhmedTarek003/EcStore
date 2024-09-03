import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-slate-100 flex-[2] h-[calc(100vh-58px)] p-2 shadow-md max-md:hidden">
      <ul className="flex flex-col gap-5 m-5">
        <NavLink
          to={"/dashboard"}
          className="font-semibold text-[17px] hover:text-gray-500 w-fit"
        >
          Dashboard
        </NavLink>
        <NavLink
          to={"/admin_dashboard/all_categories"}
          className="font-semibold text-[17px] hover:text-gray-500 w-fit"
        >
          Categories
        </NavLink>
        <NavLink
          to={"/admin_dashboard/all_admins"}
          className="font-semibold text-[17px] hover:text-gray-500 w-fit"
        >
          All admins
        </NavLink>
        <NavLink
          to={"/admin_dashboard/products_out_of_stock"}
          className="font-semibold text-[17px] hover:text-gray-500 w-fit"
        >
          products out of stock
        </NavLink>
        <NavLink
          to={"/admin_dashboard/create_new_product"}
          className="font-semibold text-[17px] hover:text-gray-500 w-fit"
        >
          Create new product
        </NavLink>
        <NavLink
          to={"/admin_dashboard/all_promo_code"}
          className="font-semibold text-[17px] hover:text-gray-500 w-fit"
        >
          All Promo Code
        </NavLink>
        <NavLink
          to={"/admin_dashboard/get_purshses"}
          className="font-semibold text-[17px] hover:text-gray-500 w-fit"
        >
          Purshses Orders
        </NavLink>
      </ul>
    </div>
  );
};

export default Sidebar;
