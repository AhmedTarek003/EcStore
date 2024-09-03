import { Link } from "react-router-dom";
import useGetPurshases from "../../hooks/order/useGetPurshases";
import { useSelector } from "react-redux";
import moment from "moment";

const Purshases = ({ purshasesIds }) => {
  const { loading } = useGetPurshases(purshasesIds);
  const { purshases } = useSelector((state) => state.order);

  return purshasesIds?.length > 0 ? (
    <div className="flex flex-wrap flex-col items-center my-3 gap-2 p-3 justify-center">
      <div className="text-4xl my-5 font-semibold text-gray-500 tracking-wider border-b-2">
        Purshases Orders History
      </div>
      <div className="flex flex-wrap items-center my-3 gap-2 p-3 justify-center">
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="loading loading-spinner"></div>
          </div>
        ) : (
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
              {purshases?.map((order, idx) => (
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
        )}
      </div>
    </div>
  ) : (
    <EmptyPurshases />
  );
};

export default Purshases;

export const EmptyPurshases = () => {
  return (
    <div className="flex justify-center flex-col items-center h-96">
      <div className="text-2xl font-semibold">Add your first Order</div>
      <Link to={"/"} className="btn mt-3 text-white">
        Go To Products
      </Link>
    </div>
  );
};
