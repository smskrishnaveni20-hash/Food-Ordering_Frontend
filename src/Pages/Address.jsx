import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaPhoneAlt,
  FaHome,
  FaCity,
  FaMapPin,
  FaCheck,
  FaMapMarkerAlt,
  FaCreditCard,
} from "react-icons/fa";
import { useCart } from "../Components/CartContext";

const loadSavedAddress = () => {
  try {
    const raw = localStorage.getItem("address");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? parsed : null;
  } catch {
    return null;
  }
};

function Address() {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const saved = loadSavedAddress() || {};

  const [address, setAddress] = useState({
    name: saved.name || "",
    phone: saved.phone || "",
    house: saved.house || "",
    city: saved.city || "",
    pincode: saved.pincode || "",
  });

  const [errors, setErrors] = useState({});

  // Ensure user is authenticated and cart has items
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      navigate("/login", { replace: true, state: { from: { pathname: "/address" } } });
      return;
    }

    if (cartItems.length === 0) {
      navigate("/cart", { replace: true });
    }
  }, [navigate, cartItems]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!address.name.trim()) {
      errs.name = "Full name is required.";
    }

    const cleanPhone = address.phone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = "Please enter a valid 10-digit phone number.";
    }

    if (!address.house.trim()) {
      errs.house = "House / Flat / Street address is required.";
    }

    if (!address.city.trim()) {
      errs.city = "City is required.";
    }

    const cleanPincode = address.pincode.replace(/\D/g, "");
    if (!cleanPincode || cleanPincode.length < 5 || cleanPincode.length > 6) {
      errs.pincode = "Please enter a valid 5 or 6-digit postal pincode.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      localStorage.setItem("address", JSON.stringify(address));
    } catch (err) {
      console.error("Failed to save address to localStorage:", err);
    }

    navigate("/payment");
  };

  const fields = [
    { name: "name", label: "Full Name", placeholder: "e.g. Rahul Sharma", icon: <FaUser aria-hidden="true" />, type: "text" },
    { name: "phone", label: "Phone Number", placeholder: "e.g. 9876543210", icon: <FaPhoneAlt aria-hidden="true" />, type: "tel" },
    { name: "house", label: "House / Flat / Street", placeholder: "e.g. Flat 402, Green Meadows", icon: <FaHome aria-hidden="true" />, type: "text" },
    { name: "city", label: "City", placeholder: "e.g. Calicut", icon: <FaCity aria-hidden="true" />, type: "text" },
    { name: "pincode", label: "Pincode", placeholder: "e.g. 673001", icon: <FaMapPin aria-hidden="true" />, type: "text" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lime-50 via-white to-green-50 p-6">
      {/* Decorative background blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-lime-200 rounded-full opacity-30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-green-200 rounded-full opacity-20 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-lg">
        {/* Checkout Steps Progress bar */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 bg-lime-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-xs">
              <FaCheck aria-hidden="true" />
            </span>
            <span className="text-sm font-semibold text-lime-700">Cart</span>
          </div>
          <div className="w-12 h-0.5 bg-lime-500" />
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 bg-lime-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-xs ring-4 ring-lime-100">
              2
            </span>
            <span className="text-sm font-bold text-lime-700">Address</span>
          </div>
          <div className="w-12 h-0.5 bg-gray-300" />
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-sm font-bold">
              3
            </span>
            <span className="text-sm font-medium text-gray-400">Payment</span>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-gray-100 p-8">
          <div className="text-center mb-6">
            <FaMapMarkerAlt aria-hidden="true" className="text-4xl text-lime-600 mx-auto mb-2 block" />
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Delivery Address</h2>
            <p className="text-gray-500 text-sm mt-1">Where should we deliver your delicious food?</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((field) => (
              <div key={field.name}>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  {field.label}
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    {field.icon}
                  </span>
                  <input
                    type={field.type}
                    name={field.name}
                    value={address[field.name]}
                    placeholder={field.placeholder}
                    required
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:bg-white transition text-sm text-gray-800 ${
                      errors[field.name]
                        ? "border-red-400 focus:ring-red-300"
                        : "border-gray-200 focus:ring-lime-400"
                    }`}
                  />
                </div>
                {errors[field.name] && (
                  <p className="text-red-500 text-xs mt-1 font-medium">{errors[field.name]}</p>
                )}
              </div>
            ))}

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 bg-lime-500 hover:bg-lime-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border-none text-base flex items-center justify-center gap-2"
              >
                <span>Continue to Payment</span>
                <FaCreditCard aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Address;
