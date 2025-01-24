import React from "react";
import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";
import { TextField, Button } from "@mui/material";
import logo from "../../../public/XtremeLogo.png";
export const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
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
          </ul>
        </div>

        {/* Newsletter and Social Media */}
        <div className="flex flex-col items-start">
          <h4 className="font-semibold text-lg mb-4">Stay Updated</h4>
          <p className="text-gray-400 mb-4">
            Subscribe to our newsletter for the latest updates and offers.
          </p>
          <div className="flex items-center w-full mb-4">
            <TextField
              variant="outlined"
              placeholder="Enter your email"
              size="small"
              fullWidth
              InputProps={{
                style: {
                  backgroundColor: "white",
                  borderRadius: "4px",
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ marginLeft: "8px", backgroundColor: "#333" }}
            >
              Subscribe
            </Button>
          </div>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <Facebook className="text-gray-400 hover:text-white" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <Instagram className="text-gray-400 hover:text-white" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <Twitter className="text-gray-400 hover:text-white" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              <YouTube className="text-gray-400 hover:text-white" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} FitnessApp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
