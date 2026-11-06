import React from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUtensils } from "react-icons/fa";
import { useCart } from "../Components/CartContext";
import Footer from "./Footer";

function Cart() {
  const {
    cartItems,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
    subtotal,
    totalAmount,
    totalCount,
  } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    const isLoggedIn = !!localStorage.getItem("access");
    if (!isLoggedIn) {
      navigate("/login", { state: { from: { pathname: "/address" } } });
    } else {
      navigate("/address");
    }
  };

  if (cartItems.length === 0) {
    return (
      <>
        <div className="min-h-[75vh] flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 px-6 py-16">
          <div className="w-24 h-24 bg-lime-100 rounded-full flex items-center justify-center text-5xl mb-6 shadow-inner animate-bounce text-lime-600">
            <FaShoppingCart aria-hidden="true" />
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-8 max-w-sm text-center text-sm md:text-base">
            Looks like you haven't added any mouth-watering dishes yet. Explore our menu and find your next favorite meal!
          </p>
          <button
            onClick={() => navigate("/dishes")}
            className="px-8 py-3.5 bg-lime-500 hover:bg-lime-600 text-white font-bold rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer border-none text-base inline-flex items-center gap-2"
          >
            <span>Browse Dishes</span>
            <FaUtensils aria-hidden="true" />
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50/70">
        {/* Header */}
        <div className="bg-gradient-to-r from-lime-500 via-lime-600 to-green-600 py-8 shadow-sm">
          <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                <FaShoppingCart aria-hidden="true" />
                <span>Your Cart</span>
              </h1>
              <p className="text-lime-100 mt-1 text-sm font-medium">
                {totalCount} item{totalCount > 1 ? "s" : ""} selected for delivery
              </p>
            </div>
            <button
              onClick={() => navigate("/dishes")}
              className="text-xs md:text-sm font-semibold bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full backdrop-blur-xs transition border-none cursor-pointer"
            >
              + Add More Dishes
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Cart Item Cards */}
          <div className="space-y-4 mb-8">
            {cartItems.map((item) => {
              const itemImage = item.image || item.img || item.Images || item.Image || null;
              const itemPrice = Number(item.price) || 0;
              const itemSubtotal = Math.round(itemPrice * item.quantity * 100) / 100;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-xs hover:shadow-md transition-shadow p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-gray-100"
                >
                  {/* Left: Thumbnail + info */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-16 h-16 bg-lime-50 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0 border border-lime-100">
                      {itemImage ? (
                        <img
                          src={itemImage}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                            if (e.target.nextSibling) e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <span
                        className="text-2xl text-lime-600"
                        style={{ display: itemImage ? "none" : "flex" }}
                      >
                        <FaUtensils aria-hidden="true" />
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-gray-800 text-base truncate">{item.name}</h4>
                      {item.Available_in && (
                        <p className="text-xs text-gray-400 truncate">from {item.Available_in}</p>
                      )}
                      <p className="text-green-600 font-bold text-sm mt-0.5">₹{itemPrice}</p>
                    </div>
                  </div>

                  {/* Right controls: Qty + Subtotal + Remove */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-50">
                    {/* Qty controls */}
                    <div className="flex items-center gap-1.5 bg-gray-50 p-1 rounded-full border border-gray-200">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="w-8 h-8 rounded-full bg-white hover:bg-gray-100 text-gray-700 font-bold text-base transition cursor-pointer border-none flex items-center justify-center shadow-xs"
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        −
                      </button>
                      <span className="w-7 text-center font-bold text-sm text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="w-8 h-8 rounded-full bg-lime-500 hover:bg-lime-600 text-white font-bold text-base transition cursor-pointer border-none flex items-center justify-center shadow-xs"
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                    </div>

                    {/* Price and remove */}
                    <div className="text-right min-w-[70px]">
                      <p className="font-extrabold text-gray-800 text-base">₹{itemSubtotal}</p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 text-xs font-medium mt-0.5 bg-transparent border-none cursor-pointer transition underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary card */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h3 className="font-extrabold text-gray-900 text-xl mb-5 pb-3 border-b border-gray-100">
              Order Summary
            </h3>

            <div className="space-y-3 text-sm text-gray-600 mb-6">
              <div className="flex justify-between">
                <span>Items Subtotal ({totalCount} items)</span>
                <span className="font-semibold text-gray-800">₹{subtotal}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5">
                  <span>Delivery Partner Fee</span>
                  <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-bold">PROMO</span>
                </span>
                <span className="text-green-600 font-bold">FREE</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between items-baseline">
                <div>
                  <span className="font-extrabold text-gray-900 text-lg block">Total Amount</span>
                  <span className="text-xs text-gray-400">Inclusive of all taxes</span>
                </div>
                <span className="font-black text-green-600 text-2xl">₹{totalAmount}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleCheckout}
                className="flex-1 py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer border-none text-base flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <span>→</span>
              </button>
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to clear your entire cart?")) {
                    clearCart();
                  }
                }}
                className="px-6 py-3.5 border border-red-200 text-red-500 hover:bg-red-50 font-semibold rounded-2xl transition cursor-pointer bg-transparent text-sm"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cart;
