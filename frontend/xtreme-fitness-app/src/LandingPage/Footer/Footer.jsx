import React from "react";
import { Instagram } from "@mui/icons-material";
import { Button } from "@mui/material";
import logo from "../../../public/LogoWhite.png";

export const Footer = () => {
  return (
    <footer className="bg-[#4F0716] text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {/* Logo and About */}
        <div className="flex flex-col items-start">
          <img
            src={logo}
            alt="Logo"
            className="w-60 mb-4"
          />
          <p className="text-gray-400 ">
            Unlock your potential with customized workout and meal plans
            designed just for you. Start your fitness transformation today!
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-start">
          <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="/about" className="text-gray-400 hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="/products" className="text-gray-400 hover:text-white">
                Features
              </a>
            </li>
            <li>
              <a href="/faq" className="text-gray-400 hover:text-white">
                FAQs
              </a>
            </li>
            <li>
              <a href="/contact" className="text-gray-400 hover:text-white">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/no-refund-policy" className="text-gray-400 hover:text-white">
                No Refund Policy
              </a>
            </li>
            {/* Adding Terms and Privacy links */}
            <li>
              <a href="/terms-and-conditions" className="text-gray-400 hover:text-white">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="/privacy-policy" className="text-gray-400 hover:text-white">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info and Social Media */}
        <div className="flex flex-col items-start">
          <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
          <p className="text-gray-400 mb-2">
            Phone: <span className="text-white"> (800) 383-0689 </span>
          </p>
          <p className="text-gray-400">
            Email: <span className="text-white"> support@xtremeft.com </span>
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="https://www.instagram.com/xtreme_fitness/" target="_blank" rel="noreferrer">
              <Instagram className="text-gray-400 hover:text-white" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Xtreme Fitness. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
