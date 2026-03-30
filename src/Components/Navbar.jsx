import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [query, setQuery] = useState("");

  const checkLogin = () => {
    const accessToken = localStorage.getItem("access");
    setIsLoggedIn(!!accessToken);
  };

  useEffect(() => {
    checkLogin();

    const handleAuthChange = () => checkLogin();
    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.dispatchEvent(new Event("authChange"));
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/dishes?search=${query.trim()}`);
      setQuery("");
    }
  };

  return (
    <nav className="flex items-center justify-between p-5 bg-lime-500">
      <h4 className="italianno-regular text-4xl text-black italic">EatyGo</h4>

      <div className="flex gap-6 items-center italic">
        <Link className="hover:underline" to="/">
          Home
        </Link>

        {!isLoggedIn && (
          <>
            <Link className="hover:underline" to="/register">
              Register
            </Link>
            <Link className="hover:underline" to="/login">
              Login
            </Link>
          </>
        )}

        {isLoggedIn && (
          <>
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search dishes..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="px-3 py-1 rounded-md text-black outline-none"
              />
              <button
                type="submit"
                className="bg-black text-white px-3 py-1 rounded-md hover:bg-gray-800"
              >
                Search
              </button>
            </form>

            <Link className="hover:underline" to="/restaurants">
              Restaurants
            </Link>
            <Link className="hover:underline" to="/cart">
              Cart
            </Link>

            <button
              className="hover:underline bg-transparent border-none cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}