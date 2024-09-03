import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Sidebar from "../../../components/sidebar/Sidebar";
import DashboardHeader from "../../../components/header/DashBoardHeader";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import useGetAllCategories from "../../../hooks/category/useGetAllCategories";
import useDeleteCategory from "../../../hooks/category/useDeleteCategory";

const AllCategories = () => {
  const { categories } = useSelector((state) => state.category);
  useGetAllCategories();
  const { deleteCate } = useDeleteCategory();

  const deletHandler = (id) => {
    Swal.fire({
      title: "Are you sure you want delete this category? ",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCate(id);
      }
    });
  };

  return (
    <div>
      <DashboardHeader />
      <div className="flex">
        <Sidebar />
        <div className="flex-[9] p-3 overflow-auto h-[calc(100vh-65px)]">
          <div className="text-center mt-3 text-3xl uppercase text-gray-600">
            All Categories
          </div>
          <div>
            <Link
              to={"/admin_dashboard/create_new_category"}
              className="btn btn-primary text-white text-lg mt-4"
            >
              Create new category
            </Link>
          </div>
          <div className="overflow-x-auto mt-5 p-3">
            <table className="table border-collapse border">
              <thead>
                <tr className="text-lg text-black text-center">
                  <th className="border">#</th>
                  <th className="border">category</th>
                  <th className="border">Actions</th>
                </tr>
              </thead>

              <tbody>
                {categories?.map((category, idx) => (
                  <tr key={idx} className="text-center">
                    <th className="border">{idx + 1}</th>
                    <td className="border text-lg">{category?.category}</td>
                    <td className="border">
                      <div className="flex justify-center items-center gap-2">
                        <Link
                          to={`/admin_dashboard/update_category/${category?._id}`}
                        >
                          <FaEdit
                            size={27}
                            color="green"
                            className="cursor-pointer"
                          />
                        </Link>
                        <MdDelete
                          size={27}
                          color="red"
                          className="cursor-pointer"
                          onClick={() => deletHandler(category?._id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCategories;
