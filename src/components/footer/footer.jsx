import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import React from "react";
import { AppRoutesPaths } from "../routes/app_route";

const Footer = () => {
    const navigate = useNavigate();
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start gap-6">
        
        {/* Brand + Logo */}
        <div className="md:w-1/3">
          <div className="flex items-center gap-3 mb-3">
            <img src={logo} onClick={() => navigate(AppRoutesPaths.home)} alt="Fragrance Logo" className="h-10 w-auto cursor-pointer" />
            <h2 className="text-2xl font-bold">FRAGRANCE</h2>
          </div>
          <p className="text-sm text-gray-300">
            Premium perfumes at unbeatable prices. Shop online and get them delivered to you.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="text-sm space-y-1">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/about" className="hover:underline">About Us</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>WhatsApp: (+123) 678-566-292 </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-xs text-gray-500 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} Fragrance. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
