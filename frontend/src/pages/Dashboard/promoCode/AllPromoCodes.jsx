import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import DashboardHeader from "../../../components/header/DashBoardHeader";
import Sidebar from "../../../components/sidebar/Sidebar";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useGetAllPromoCode } from "../../../hooks/promo-code/useGetAllPromoCode";
import moment from "moment";
import useDeletePromoCode from "../../../hooks/promo-code/useDeletePromoCode";

const AllPromoCodes = () => {
  const { promoCodes } = useSelector((state) => state.promocode);
  useGetAllPromoCode();
  const { deletePromoCode } = useDeletePromoCode();
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
        deletePromoCode(id);
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
            All Promo-Code
          </div>
          <div>
            <Link
              to={"/admin_dashboard/create_new_promocode"}
              className="btn btn-primary text-white text-lg mt-4"
            >
              Create new promo-code
            </Link>
          </div>
          <div className="overflow-x-auto mt-5 p-3">
            <table className="table border-collapse border">
              <thead>
                <tr className="text-lg text-black text-center">
                  <th className="border">#</th>
                  <th className="border">promo-code</th>
                  <th className="border">expier date</th>
                  <th className="border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {promoCodes?.map((pc, idx) => (
                  <tr key={idx} className="text-center">
                    <th className="border">{idx + 1}</th>
                    <td className="border text-lg">{pc?.promoCode}</td>
                    <td className="border text-lg">
                      {moment(pc?.expireAt).format("YYYY-MM-DD")}
                    </td>
                    <td className="border">
                      <MdDelete
                        size={27}
                        color="red"
                        className="cursor-pointer mx-auto"
                        onClick={() => deletHandler(pc?._id)}
                      />
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

export default AllPromoCodes;
