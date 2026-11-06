import React from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaHome } from "react-icons/fa";
import Footer from "./Footer";

export default function NotFound() {
  return (
    <>
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 px-6 py-16 text-center">
        <FaSearch aria-hidden="true" className="text-6xl text-lime-500 mx-auto mb-4 block" />
        <h1 className="text-4xl font-black text-gray-900 mb-2">Page Not Found</h1>
        <p className="text-gray-500 max-w-sm mb-6 text-sm">
          We couldn't find the page you're looking for. It might have been moved or removed.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-lime-500 hover:bg-lime-600 text-white font-bold rounded-full shadow-md transition text-sm inline-flex items-center gap-2"
        >
          Back to Home <FaHome aria-hidden="true" />
        </Link>
      </div>
      <Footer />
    </>
  );
}

