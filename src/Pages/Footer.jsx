import React from "react";
import { Link } from "react-router-dom";
import {
  FaUtensils,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaHeart,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  const socials = [
    { icon: FaFacebookF, label: "Facebook" },
    { icon: FaXTwitter, label: "Twitter / X" },
    { icon: FaInstagram, label: "Instagram" },
    { icon: FaYoutube, label: "YouTube" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 mt-0">
      {/* Top section */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FaUtensils aria-hidden="true" className="text-2xl text-lime-400" />
            <span className="text-2xl font-extrabold text-lime-400 italic">EatyGo</span>
          </div>
          <p className="text-sm leading-relaxed text-gray-400">
            Order delicious food from your favorite restaurants. Fast delivery, fresh food, happy you!
          </p>
          {/* Social icons */}
          <div className="flex gap-3 mt-4">
            {socials.map((s, i) => {
              const IconComponent = s.icon;
              return (
                <button
                  key={i}
                  aria-label={s.label}
                  className="w-9 h-9 bg-gray-800 text-gray-300 rounded-full flex items-center justify-center text-sm hover:bg-lime-600 hover:text-white transition cursor-pointer border-none"
                >
                  <IconComponent aria-hidden="true" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {[
              { label: "Home", to: "/" },
              { label: "Restaurants", to: "/restaurants" },
              { label: "Dishes", to: "/dishes" },
              { label: "Cart", to: "/cart" },
            ].map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="text-gray-400 hover:text-lime-400 transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h3>
          <ul className="space-y-2 text-sm">
            {["About Us", "Careers", "Blog", "Terms of Service", "Privacy Policy"].map((item) => (
              <li key={item}>
                <span className="text-gray-400 hover:text-lime-400 transition-colors cursor-pointer">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact Us</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-center gap-2">
              <FaEnvelope aria-hidden="true" className="text-lime-400" />
              <span>support@eatygo.com</span>
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt aria-hidden="true" className="text-lime-400" />
              <span>+91 000 000 0000</span>
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt aria-hidden="true" className="text-lime-400" />
              <span>Calicut, Kerala, India</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
          <p>&copy; 2026 EatyGo. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 flex items-center">
            Made with <FaHeart aria-hidden="true" className="text-red-400 inline mx-1" /> in Kerala
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
