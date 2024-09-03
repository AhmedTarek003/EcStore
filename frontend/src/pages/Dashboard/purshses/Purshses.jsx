import Sidebar from "../../../components/sidebar/Sidebar";
import DashboardHeader from "../../../components/header/DashBoardHeader";
import { useSelector } from "react-redux";
import useGetAllOrders from "../../../hooks/order/useGetAllOrders";
import moment from "moment";

const Purshses = () => {
  const { orders } = useSelector((state) => state.order);
  useGetAllOrders();

  return (
    <div>
      <DashboardHeader />
      <div className="flex">
        <Sidebar />
        <div className="flex-[9] p-3 overflow-auto h-[calc(100vh-65px)]">
          <div className="text-center mt-3 text-3xl uppercase text-gray-600">
            All Purshses
          </div>
          <div className="overflow-x-auto mt-5 p-3">
            <table className="table border-collapse border">
              <thead>
                <tr className="text-lg text-black text-center">
                  <th className="border">#</th>
                  <th className="border">order</th>
                  <th className="border">total</th>
                  <th className="border">date</th>
                  <th className="border">status</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order, idx) => (
                  <tr key={idx} className="text-center">
                    <th className="border">{idx + 1}</th>
                    <td className="border text-lg">{order?._id}</td>
                    <td className="border text-lg">{order?.totalPrice}$</td>
                    <td className="border text-lg">
                      {moment(order?.createdAt).format("YYYY-MM-DD")}
                    </td>
                    <td className="border text-lg bg-yellow-200">pendeng</td>
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

export default Purshses;
