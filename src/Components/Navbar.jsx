import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUtensils, FaSearch, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useCart } from "./CartContext";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalCount } = useCart();

  // Lazy initialize state directly from localStorage so no synchronous setState in effect is needed
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("access"));
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedIn(!!localStorage.getItem("access"));
    };

    window.addEventListener("authChange", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("authChange"));
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      navigate(`/dishes?search=${encodeURIComponent(trimmed)}`);
      setQuery("");
      setMobileOpen(false);
    }
  };

  const isActive = (path) => location.pathname === path;

  const getNavLinkClass = (path) =>
    `relative font-medium transition-colors ${
      isActive(path)
        ? "text-lime-700 font-semibold"
        : "text-gray-700 hover:text-lime-700"
    } after:absolute after:left-0 after:-bottom-1 after:h-0.5 ${
      isActive(path) ? "after:w-full bg-transparent" : "after:w-0 hover:after:w-full"
    } after:bg-lime-600 after:transition-all after:duration-300`;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-xs">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 no-underline group">
          <FaUtensils aria-hidden="true" className="text-2xl text-lime-600 group-hover:scale-110 transition-transform" />
          <span className="text-2xl font-extrabold text-lime-600 tracking-tight italic">
            EatyGo
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link className={getNavLinkClass("/")} to="/">
            Home
          </Link>

          <Link className={getNavLinkClass("/restaurants")} to="/restaurants">
            Restaurants
          </Link>

          <Link className={getNavLinkClass("/dishes")} to="/dishes">
            Dishes
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex items-center">
            <div className="flex items-center bg-gray-100 rounded-full px-3 py-1.5 border border-transparent focus-within:border-lime-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-lime-100 transition-all">
              <input
                type="text"
                placeholder="Search dishes…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-transparent text-sm text-gray-700 outline-none w-40 lg:w-48 placeholder-gray-400"
              />
              <button
                type="submit"
                aria-label="Search"
                className="text-gray-500 hover:text-lime-600 transition cursor-pointer bg-transparent border-none text-sm p-0 ml-1 flex items-center justify-center"
              >
                <FaSearch aria-hidden="true" />
              </button>
            </div>
          </form>

          {/* Cart Icon with real-time Badge */}
          <Link
            to="/cart"
            className="relative p-2 text-gray-700 hover:text-lime-600 transition group flex items-center"
            aria-label={`Shopping cart containing ${totalCount} items`}
          >
            <FaShoppingCart aria-hidden="true" className="text-2xl group-hover:scale-110 inline-block transition-transform" />
            {totalCount > 0 && (
              <span className="absolute 0 top-0.5 -right-0.5 bg-lime-600 text-white text-[11px] font-black rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center shadow-md ring-2 ring-white">
                {totalCount > 99 ? "99+" : totalCount}
              </span>
            )}
          </Link>

          {!isLoggedIn ? (
            <div className="flex items-center gap-3">
              <Link className={getNavLinkClass("/register")} to="/register">
                Register
              </Link>
              <Link
                to="/login"
                className="px-5 py-2 bg-lime-500 hover:bg-lime-600 text-white font-semibold rounded-full transition-all shadow-xs hover:shadow-md text-sm cursor-pointer"
              >
                Login
              </Link>
            </div>
          ) : (
            <button
              className="px-4 py-2 text-sm font-medium text-red-500 border border-red-300 rounded-full hover:bg-red-50 transition cursor-pointer bg-transparent"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile header controls */}
        <div className="flex items-center gap-3 md:hidden">
          <Link
            to="/cart"
            className="relative p-1 text-gray-700 flex items-center"
            aria-label={`Shopping cart with ${totalCount} items`}
          >
            <FaShoppingCart aria-hidden="true" className="text-2xl" />
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-lime-600 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center">
                {totalCount > 99 ? "99+" : totalCount}
              </span>
            )}
          </Link>

          <button
            className="text-2xl bg-transparent border-none cursor-pointer p-1 text-gray-700 flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3 shadow-lg">
          <form onSubmit={handleSearch} className="flex items-center gap-2 mb-3">
            <input
              type="text"
              placeholder="Search dishes…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-lime-400"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-lime-500 text-white rounded-lg text-sm font-semibold cursor-pointer border-none"
            >
              Search
            </button>
          </form>

          <Link
            className={`block py-2 font-medium ${isActive("/") ? "text-lime-600 font-bold" : "text-gray-700"}`}
            to="/"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>

          <Link
            className={`block py-2 font-medium ${isActive("/restaurants") ? "text-lime-600 font-bold" : "text-gray-700"}`}
            to="/restaurants"
            onClick={() => setMobileOpen(false)}
          >
            Restaurants
          </Link>

          <Link
            className={`block py-2 font-medium ${isActive("/dishes") ? "text-lime-600 font-bold" : "text-gray-700"}`}
            to="/dishes"
            onClick={() => setMobileOpen(false)}
          >
            Dishes
          </Link>

          <Link
            className="flex items-center justify-between py-2 text-gray-700 font-medium"
            to="/cart"
            onClick={() => setMobileOpen(false)}
          >
            <span className="flex items-center gap-2">
              <FaShoppingCart aria-hidden="true" /> Cart
            </span>
            {totalCount > 0 && (
              <span className="bg-lime-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
                {totalCount}
              </span>
            )}
          </Link>

          {!isLoggedIn ? (
            <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
              <Link
                className="block py-2 text-gray-700 font-medium"
                to="/register"
                onClick={() => setMobileOpen(false)}
              >
                Register
              </Link>
              <Link
                className="block text-center py-2.5 bg-lime-500 text-white font-semibold rounded-lg"
                to="/login"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>
            </div>
          ) : (
            <div className="pt-2 border-t border-gray-100">
              <button
                className="w-full text-left py-2 text-red-500 font-medium bg-transparent border-none cursor-pointer"
                onClick={() => {
                  handleLogout();
                  setMobileOpen(false);
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
