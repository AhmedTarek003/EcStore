import { useEffect } from "react";
import { MdOutlineDone } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useMakeOrder from "../../hooks/order/useMakeOrder";

const Success = () => {
  const navigate = useNavigate();
  const c = localStorage.getItem("c");
  const { cart } = useSelector((state) => state.cart);
  const order = [];
  c &&
    cart?.map((item) =>
      order.push({
        product: item._id,
        quantity: item.quantity,
        color: item.color ? item.color : null,
        size: item.size ? item.size : null,
      })
    );

  const { makeOrder } = useMakeOrder();

  useEffect(() => {
    const createOrder = async () => {
      await makeOrder(order);
      localStorage.removeItem("c");
      navigate("/");
      window.location.reload();
    };
    if (c) {
      createOrder();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className=" mt-10 text-center w-full">
      <div className="w-16 h-16 rounded-full bg-green-600 flex justify-center items-center m-auto">
        <MdOutlineDone size={35} color="white" />
      </div>
      <div className="text-2xl font-bold">Payment Done!</div>
      <div>thank you for completing your secure online payment</div>
      <div>Have a great day.</div>
    </div>
  );
};

export default Success;
