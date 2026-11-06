import React, { Component } from "react";
import { FaUtensils, FaHome, FaRedo } from "react-icons/fa";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an unhandled error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border border-gray-100">
            <FaUtensils aria-hidden="true" className="text-6xl text-lime-500 mx-auto mb-4" />
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-gray-500 text-sm mb-6">
              We encountered an unexpected error while loading this page. Please try refreshing or return to the homepage.
            </p>
            <div className="space-y-3">
              <button
                onClick={this.handleReset}
                className="w-full py-3 bg-lime-500 hover:bg-lime-600 text-white font-bold rounded-xl shadow-md transition cursor-pointer border-none text-sm inline-flex items-center justify-center gap-2"
              >
                <span>Return to Home</span>
                <FaHome aria-hidden="true" />
              </button>
              <button
                onClick={() => window.location.reload()}
                className="w-full py-2.5 border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold rounded-xl transition cursor-pointer bg-transparent text-sm inline-flex items-center justify-center gap-2"
              >
                <span>Reload Page</span>
                <FaRedo aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
