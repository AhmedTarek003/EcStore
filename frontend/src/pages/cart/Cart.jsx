import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import style from "./cart.module.css";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../redux/slices/cartSlice";
import Quantity from "../../components/Quantity/Quantity";
import useGetPromocode from "../../hooks/promo-code/useGetPromocode";
import GetPromoCodes from "../../components/getAllPromoCodes/GetPromoCodes";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";
import { promoCodeActions } from "../../redux/slices/promocodeSlice";
import { request } from "../../utils/request";

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.cart);
  const [cart, setCart] = useState(items);
  useEffect(() => {
    if (items.length <= 0) {
      dispatch(promoCodeActions.removePromoCode());
    }
    setCart(items);
  }, [items, items.length, dispatch]);
  const [updatedCart, setUpdatedCart] = useState([]);
  let totalPrice =
    cart?.length > 0 &&
    cart.map((p) => p?.discountPercent * p?.quantity).reduce((a, c) => a + c);
  // console.log(totalPrice);
  const handleQuantity = (id, newQuantity) => {
    const updatedCart = cart.map((item) =>
      // eslint-disable-next-line no-undef
      item._id === id
        ? {
            ...item,
            quantity: newQuantity,
            totalPrice: item.discountPercent * newQuantity,
          }
        : item
    );
    setUpdatedCart(updatedCart);
  };
  useEffect(() => {
    if (updatedCart.length > 0) {
      setCart(updatedCart);
      localStorage.setItem("c", JSON.stringify(cart));
    }
  }, [cart, updatedCart, updatedCart.length]);

  const { getPromoCode, loading } = useGetPromocode();
  const { promo_code } = useSelector((state) => state.promocode);
  const [promoCode, setPromoCode] = useState("");
  const discountTotalPrice =
    promo_code && totalPrice - totalPrice * (promo_code?.discountPercent / 100);

  const addPromoCode = (e) => {
    e.preventDefault();
    getPromoCode(promoCode);
  };

  // CHECK OUT WITH STRIPE
  const makePayment = async () => {
    // eslint-disable-next-line no-undef
    const stripe = await loadStripe(
      "pk_test_51Pl8thP8Veq5DSToWettl9HFnbv7a3CdS2LCCs8yoFb5XeJPD0Uc1iZCRDZXBD7JbANBYdMKaS76ftjoP9IaB0JR00MlyVyv4f"
    );

    try {
      const { data } = await request.post(
        "/api/stripe/create_checkout_session",
        {
          products: cart,
          discountPercent: promo_code !== null ? promo_code.discountPercent : 0,
        },
        { withCredentials: true }
      );
      const result = stripe.redirectToCheckout({
        sessionId: data.id,
      });
      if (result.error) {
        console.error(result.error);
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <>
      {items?.length <= 0 ? (
        <>
          <Header />
          <EmptyCart />
        </>
      ) : (
        <>
          <Header />
          <div className="p-3">
            <h1 className="text-center uppercase text-4xl font-semibold my-5 underline text-gray-700 ">
              Your Cart
            </h1>
            <button
              className="btn btn-error text-white text-[18px]"
              onClick={() => dispatch(cartActions.clearCart())}
            >
              clear cart
            </button>
            <div className="flex gap-3 max-lg:flex-col">
              <div
                className={`flex-[9] h-[calc(100vh-170px)] overflow-auto ${style.cart_products}`}
              >
                {cart?.map((product) => (
                  <div
                    key={product?._id}
                    className="border my-3 p-2 rounded-md flex items-center gap-2 max-md:w-full"
                  >
                    <div>
                      <img
                        src={product?.productImages[0]?.url}
                        alt="product image"
                        className="w-32"
                      />
                    </div>
                    <div className="flex justify-between flex-1 items-center max-md:flex-col max-md:items-start">
                      <div className="font-bold w-[200px] text-[18px] leading-[1.2] max-md:w-full">
                        {product?.productName}
                      </div>
                      <div className="mt-2 flex flex-col gap-5 items-center max-md:flex-row">
                        <span>Price</span>
                        <span className="font-semibold text-[17px]">
                          ${product?.discountPercent}
                          {product?.discountPrice > 0 && (
                            <span className="bg-green-300 py-[1px] px-[5px] rounded-md">
                              disc : {product?.discountPrice}%
                            </span>
                          )}
                        </span>
                      </div>
                      <div>
                        {product?.color && (
                          <div className="flex items-center gap-2">
                            Color :{" "}
                            <span
                              style={{ backgroundColor: product?.color }}
                              className={`w-[15px] h-[15px] rounded-full`}
                            ></span>
                          </div>
                        )}
                        {product?.size && (
                          <div className="flex items-center gap-2">
                            Size :{" "}
                            <span className="font-semibold text-[17px]">
                              {product?.size}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="mt-2 flex flex-col items-center gap-5 max-md:flex-row ">
                        <Quantity
                          product={product}
                          handleQuantityChange={handleQuantity}
                        />
                      </div>
                      <div className="mt-2 flex flex-col gap-5 items-center max-md:flex-row">
                        <span>TotalPrice</span>
                        <span className="font-semibold text-[17px]">
                          ${product?.discountPercent * product?.quantity}
                        </span>
                      </div>
                      <div className="cursor-pointer">
                        <MdDelete
                          color="red"
                          size={30}
                          onClick={() =>
                            dispatch(cartActions.deleteFromCart(product?._id))
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex-[3]">
                <form onSubmit={addPromoCode}>
                  <label className="label font-semibold">PROMO CODE</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Enter your code"
                      className="input w-full bg-slate-200 shadow-md"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <div>
                      <GetPromoCodes />
                    </div>
                  </div>
                  {promo_code && (
                    <div className="mt-3 bg-orange-400 w-fit py-[5px] px-[15px] rounded-lg text-white font-bold">
                      disc : {promo_code.discountPercent}%
                    </div>
                  )}
                  <button
                    type="submit"
                    className="btn btn-primary my-3 text-white"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="loading loading-spinner"></div>
                    ) : (
                      "Apply"
                    )}
                  </button>
                </form>
                <div className=" border rounded-md p-3 h-fit mt-3">
                  <div className="flex justify-between p-3 items-center">
                    <span className="font-semibold text-[18px]">Subtotal</span>
                    <span className="font-bold">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between p-3 items-center">
                    <span className="font-semibold text-[18px]">Shiping</span>
                    <span className="font-bold">$0.00</span>
                  </div>
                  <div className="flex justify-between p-3 items-center">
                    <span className="font-semibold text-[18px]">Taxes</span>
                    <span className="font-bold">$0.00</span>
                  </div>
                  <div className="flex justify-between p-3 items-center">
                    <span className="font-semibold text-[18px]">Discount</span>
                    <span className="font-bold">
                      {promo_code
                        ? `$${(totalPrice - discountTotalPrice).toFixed(2)}`
                        : "$0.00"}
                    </span>
                  </div>
                  <div className="divider"></div>
                  <div className="flex justify-between p-3 items-center">
                    <span className="font-bold text-[18px]">Order Total</span>
                    <span className="font-extrabold">
                      $
                      {promo_code
                        ? discountTotalPrice.toFixed(2)
                        : totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <button
                    className="btn w-full mt-3 text-xl text-white uppercase tracking-wider hover:bg-[#777]"
                    onClick={makePayment}
                  >
                    CheckOut
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;

const EmptyCart = () => {
  return (
    <div className="flex justify-center items-center flex-col mt-10">
      <div className="font-semibold text-2xl">
        Empty cart,Add your first order
      </div>
      <Link to={"/"} className="btn btn-accent text-white text-lg mt-3">
        Go To Products
      </Link>
    </div>
  );
};
