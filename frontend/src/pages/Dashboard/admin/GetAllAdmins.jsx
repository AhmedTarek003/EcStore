import { MdDelete } from "react-icons/md";
import Sidebar from "../../../components/sidebar/Sidebar";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import DashboardHeader from "../../../components/header/DashBoardHeader";
import { useSelector } from "react-redux";
import useGetAllUsers from "../../../hooks/users/useGetAllUsers";
import useDeleteUser from "../../../hooks/users/useDeleteUser";

const GetAllAdmins = () => {
  const { users } = useSelector((state) => state.user);
  const admins = users?.filter((admin) => admin.isAdmin);

  const { loading } = useGetAllUsers();
  const { deleteUser } = useDeleteUser();

  const deletHandler = (_id) => {
    Swal.fire({
      title: "Are you sure you want delete this admin? ",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(_id);
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
            All Admins
          </div>
          <div>
            <Link
              to={"/admin_dashboard/create_new_admin"}
              className="btn btn-primary text-white text-lg mt-4"
            >
              Create new admin
            </Link>
          </div>

          <div className="overflow-x-auto mt-5 p-3">
            <table className="table border-collapse border">
              <thead>
                <tr className="text-lg text-black text-center">
                  <th className="border">#</th>
                  <th className="border">profile Pic</th>
                  <th className="border">Full Name</th>
                  <th className="border">Email</th>
                  <th className="border">Phone Number</th>
                  <th className="border">Actions</th>
                </tr>
              </thead>
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="loading loading-spinner w-16 text-gray-400"></div>
                </div>
              ) : (
                <tbody>
                  {admins?.map((user, idx) => (
                    <tr key={idx} className="text-center">
                      <th className="border">{idx + 1}</th>
                      <td className="border ">
                        <img
                          src={user?.profilePic?.url}
                          alt="admin profile picture"
                          className="w-10  mx-auto"
                        />
                      </td>
                      <td className="border">{user?.fullname}</td>
                      <td className="border">{user?.email}</td>
                      <td className="border">{user?.phoneNumber}</td>
                      <td className="border">
                        <div className="flex justify-center items-center gap-2">
                          <MdDelete
                            size={27}
                            color="red"
                            className="cursor-pointer"
                            onClick={() => deletHandler(user?._id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetAllAdmins;
