import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCheck,
  FaClock,
  FaHome,
  FaUtensils,
  FaCreditCard,
  FaMapMarkerAlt,
  FaExclamationCircle,
  FaLock,
  FaMoneyBillWave,
} from "react-icons/fa";
import { SiGooglepay, SiPhonepe, SiPaytm } from "react-icons/si";
import API, { extractErrorMessage } from "../axios";
import { useCart } from "../Components/CartContext";
import Footer from "./Footer";

const paymentMethods = [
  { value: "GPAY", label: "Google Pay", icon: SiGooglepay, iconColor: "text-green-600", color: "from-green-50 to-green-100", border: "border-green-400" },
  { value: "PHONEPE", label: "PhonePe", icon: SiPhonepe, iconColor: "text-purple-600", color: "from-purple-50 to-purple-100", border: "border-purple-400" },
  { value: "PAYTM", label: "Paytm", icon: SiPaytm, iconColor: "text-sky-600", color: "from-blue-50 to-blue-100", border: "border-blue-400" },
  { value: "CARD", label: "Debit / Credit Card", icon: FaCreditCard, iconColor: "text-orange-500", color: "from-orange-50 to-orange-100", border: "border-orange-400" },
  { value: "COD", label: "Cash On Delivery", icon: FaMoneyBillWave, iconColor: "text-emerald-600", color: "from-amber-50 to-amber-100", border: "border-amber-400" },
];

function Payment() {
  const [method, setMethod] = useState("COD");
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [orderConfirmed, setOrderConfirmed] = useState(null);

  const { cartItems, totalAmount, totalCount, clearCart } = useCart();
  const navigate = useNavigate();

  // Load saved address
  const [deliveryAddress, setDeliveryAddress] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      navigate("/login", { replace: true, state: { from: { pathname: "/payment" } } });
      return;
    }

    if (cartItems.length === 0 && !orderConfirmed) {
      navigate("/cart", { replace: true });
      return;
    }

    try {
      const storedAddr = localStorage.getItem("address");
      if (storedAddr) {
        setDeliveryAddress(JSON.parse(storedAddr));
      }
    } catch {
      // ignore
    }
  }, [navigate, cartItems, orderConfirmed]);

  // Real backend checkout flow: create order then make payment
  const processRealPayment = async () => {
    if (!method || loading) return;

    const token = localStorage.getItem("access");
    if (!token) {
      navigate("/login", { replace: true, state: { from: { pathname: "/payment" } } });
      return;
    }

    if (cartItems.length === 0) {
      navigate("/cart", { replace: true });
      return;
    }

    setLoading(true);
    setPaymentError(null);

    try {
      // Step 1: Create Order with cart items
      const orderPayload = {
        items: cartItems.map((item) => ({
          dish: item.id,
          quantity: item.quantity,
        })),
      };

      const orderResponse = await API.post("api/v1/orders/", orderPayload);
      const newOrderId = orderResponse.data?.id;

      if (!newOrderId) {
        throw new Error("Failed to create order: server did not return an order ID.");
      }

      // Step 2: Make payment for the newly created order
      const paymentPayload = {
        order: newOrderId,
        payment_method: method,
      };

      await API.post("api/v1/payment/make/", paymentPayload);

      // Only on success of BOTH calls: clear cart and show confirmation
      clearCart();
      setOrderConfirmed({
        orderId: newOrderId,
        method: method,
        amount: orderResponse.data?.total_price || totalAmount,
        timestamp: new Date().toLocaleTimeString(),
      });
    } catch (error) {
      console.error("Checkout failed:", error);
      const parsedError = extractErrorMessage(
        error,
        "Payment processing failed. Your order could not be completed. Please try again."
      );
      // Real error shown; do NOT clear cart on failure
      setPaymentError(parsedError);
    } finally {
      setLoading(false);
    }
  };

  // If order was successfully confirmed, show confirmation screen
  if (orderConfirmed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-lime-50 p-6">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center animate-fade-in">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-5 shadow-inner">
            <FaCheck aria-hidden="true" />
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">
            Order Confirmed!
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Thank you for your order! Your delicious meal is being prepared.
          </p>

          <div className="bg-gray-50 rounded-2xl p-5 mb-6 text-left border border-gray-100 space-y-2.5 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Order ID:</span>
              <span className="font-mono font-bold text-gray-800">#{orderConfirmed.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Payment Mode:</span>
              <span className="font-semibold text-gray-800">{orderConfirmed.method}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Amount Paid:</span>
              <span className="font-extrabold text-green-600 text-base">₹{orderConfirmed.amount}</span>
            </div>
            {deliveryAddress?.house && (
              <div className="pt-2 border-t border-gray-200">
                <span className="text-gray-500 block text-xs mb-1">Delivering to:</span>
                <p className="text-xs text-gray-700 font-medium leading-relaxed">
                  {deliveryAddress.name} ({deliveryAddress.phone})<br />
                  {deliveryAddress.house}, {deliveryAddress.city} - {deliveryAddress.pincode}
                </p>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t border-gray-200 text-xs text-gray-500">
              <span>Estimated Delivery:</span>
              <span className="font-bold text-lime-700 inline-flex items-center gap-1">
                30-40 mins <FaClock aria-hidden="true" />
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => navigate("/")}
              className="w-full py-3.5 bg-lime-500 hover:bg-lime-600 text-white font-bold rounded-xl shadow-md transition cursor-pointer border-none text-base inline-flex items-center justify-center gap-2"
            >
              Back to Home <FaHome aria-hidden="true" />
            </button>
            <button
              onClick={() => navigate("/dishes")}
              className="w-full py-2.5 border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold rounded-xl transition cursor-pointer bg-transparent text-sm inline-flex items-center justify-center gap-2"
            >
              Order More Dishes <FaUtensils aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-lime-50 p-6 py-12">
        {/* Background blobs */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-green-200 rounded-full opacity-30 blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-lime-200 rounded-full opacity-20 blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-lg">
          {/* Progress bar */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 bg-lime-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-xs">
                <FaCheck aria-hidden="true" />
              </span>
              <span className="text-sm font-semibold text-lime-700">Cart</span>
            </div>
            <div className="w-12 h-0.5 bg-lime-500" />
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 bg-lime-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-xs">
                <FaCheck aria-hidden="true" />
              </span>
              <span className="text-sm font-semibold text-lime-700">Address</span>
            </div>
            <div className="w-12 h-0.5 bg-lime-500" />
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 bg-lime-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-xs ring-4 ring-lime-100">
                3
              </span>
              <span className="text-sm font-bold text-lime-700">Payment</span>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8">
            <div className="text-center mb-6">
              <FaCreditCard aria-hidden="true" className="text-4xl text-lime-600 mx-auto mb-2 block" />
              <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Payment Method</h2>
              <p className="text-gray-500 text-sm mt-1">Select your preferred payment option</p>
            </div>

            {/* Delivery address snippet */}
            {deliveryAddress?.house && (
              <div className="bg-gray-50 rounded-2xl p-3.5 mb-5 border border-gray-200/80 text-xs text-gray-600 flex items-start gap-2.5">
                <FaMapMarkerAlt aria-hidden="true" className="text-base flex-shrink-0 text-lime-600 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <span className="font-bold text-gray-800 block mb-0.5">
                    Delivery to {deliveryAddress.name} ({deliveryAddress.phone})
                  </span>
                  <span className="text-gray-500 truncate block">
                    {deliveryAddress.house}, {deliveryAddress.city} - {deliveryAddress.pincode}
                  </span>
                </div>
                <button
                  onClick={() => navigate("/address")}
                  className="text-lime-700 hover:underline font-semibold bg-transparent border-none cursor-pointer flex-shrink-0"
                >
                  Change
                </button>
              </div>
            )}

            {/* Amount display card */}
            <div className="bg-lime-50/80 rounded-2xl p-4 mb-5 border border-lime-200 text-center">
              <span className="text-xs uppercase tracking-wider text-lime-800 font-bold block mb-1">
                Total Payable ({totalCount} items)
              </span>
              <span className="text-3xl font-black text-green-700">₹{totalAmount}</span>
            </div>

            {/* Error banner when payment fails */}
            {paymentError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm">
                <div className="flex items-start gap-2.5 mb-3">
                  <FaExclamationCircle aria-hidden="true" className="text-lg flex-shrink-0 text-red-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-bold mb-0.5">Payment Request Failed</p>
                    <p className="text-xs text-red-600 leading-relaxed">{paymentError}</p>
                    <p className="text-[11px] text-gray-500 mt-1">
                      Your cart items are safe and have not been removed.
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-red-100 flex flex-col gap-2">
                  <button
                    onClick={processRealPayment}
                    className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl text-xs transition cursor-pointer border-none shadow-xs"
                  >
                    Retry Payment
                  </button>
                </div>
              </div>
            )}

            {/* Payment methods list */}
            <div className="space-y-2.5 mb-6">
              {paymentMethods.map((pm) => {
                const IconComp = pm.icon;
                return (
                  <label
                    key={pm.value}
                    className={`flex items-center gap-3.5 p-3.5 rounded-2xl cursor-pointer border-2 transition-all duration-200 ${
                      method === pm.value
                        ? `bg-gradient-to-r ${pm.color} ${pm.border} shadow-xs scale-[1.01]`
                        : "border-gray-100 bg-gray-50 hover:border-gray-200 hover:bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={pm.value}
                      checked={method === pm.value}
                      onChange={(e) => {
                        setMethod(e.target.value);
                        if (paymentError) setPaymentError(null);
                      }}
                      className="accent-lime-600 w-4 h-4 cursor-pointer"
                    />
                    <IconComp aria-hidden="true" className={`text-2xl ${pm.iconColor || "text-gray-700"}`} />
                    <div className="flex-1 min-w-0">
                      <span className="font-bold text-gray-800 text-sm block">{pm.label}</span>
                      {pm.value === "COD" && (
                        <span className="text-[11px] text-gray-400">Pay cash or UPI at delivery doorstep</span>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>

            {/* Submit button */}
            <button
              onClick={processRealPayment}
              disabled={!method || loading}
              className={`w-full py-3.5 font-bold rounded-2xl shadow-md transition-all duration-300 cursor-pointer border-none text-base flex items-center justify-center gap-2 ${
                !method || loading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                  : "bg-green-600 hover:bg-green-700 text-white hover:shadow-lg"
              }`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing Order & Payment...</span>
                </>
              ) : (
                <span className="inline-flex items-center gap-2">
                  Pay ₹{totalAmount} Now <FaLock aria-hidden="true" />
                </span>
              )}
            </button>

            <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1.5">
              <FaLock aria-hidden="true" className="text-xs" />
              <span>256-bit encrypted secure checkout</span>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Payment;
