import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import Dishes from "./Pages/Dishes";
import Payment from "./Pages/Payment";
import Register from "./Pages/Register";
import Restaurants from "./Pages/Restaurants";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Address from "./Pages/Address";
import NotFound from "./Pages/NotFound";
import ProtectedRoute from "./Components/ProtectedRoute";
import ErrorBoundary from "./Components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen flex flex-col bg-white text-gray-900">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/restaurants" element={<Restaurants />} />
              <Route path="/dishes" element={<Dishes />} />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/address"
                element={
                  <ProtectedRoute>
                    <Address />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    <Payment />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
