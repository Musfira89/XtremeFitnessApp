import React, { useState } from "react";
import { Instagram } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import logo from "../../../public/LogoWhite.png";

const Footer = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleOpenModal = (content) => {  // Removed the type annotation ": string"
    setModalContent(content);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <footer className="bg-[#4F0716] text-white py-10">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6">
        {/* Logo and About */}
        <div className="flex flex-col items-start">
          <img src={logo} alt="Logo" className="w-60 mb-4" />
          <p className="text-gray-400">
            Unlock your potential with customized workout and meal plans designed just for you. Start your fitness transformation today!
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-start">
          <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="/about" className="text-gray-400 hover:text-white">About Us</a>
            </li>
            <li>
              <a href="/products" className="text-gray-400 hover:text-white">Features</a>
            </li>
            <li>
              <a href="/faq" className="text-gray-400 hover:text-white">FAQs</a>
            </li>
            <li>
              <a href="/contact" className="text-gray-400 hover:text-white">Contact Us</a>
            </li>
            <li>
              <button
                onClick={() => handleOpenModal("No Refund Policy")}
                className="text-gray-400 hover:text-white"
              >
                No Refund Policy
              </button>
            </li>
            {/* Adding Terms and Privacy links */}
            <li>
              <button
                onClick={() => handleOpenModal("Terms & Conditions")}
                className="text-gray-400 hover:text-white"
              >
                Terms & Conditions
              </button>
            </li>
            <li>
              <button
                onClick={() => handleOpenModal("Privacy Policy")}
                className="text-gray-400 hover:text-white"
              >
                Privacy Policy
              </button>
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

      {/* Modal for displaying content */}
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogTitle>{modalContent}</DialogTitle>
        <DialogContent>
          <p>
            {/* Add content related to each section here */}
            {modalContent === "No Refund Policy" && (
              <span>
                Here is the content for No Refund Policy. We do not offer refunds for any purchases made. Please read the
                terms carefully before proceeding with any transactions.
              </span>
            )}
            {modalContent === "Terms & Conditions" && (
              <span>
                Here is the content for Terms & Conditions. These are the terms and conditions for using our website and
                services. Please read them carefully.
              </span>
            )}
            {modalContent === "Privacy Policy" && (
              <span>
                Here is the content for Privacy Policy. We take your privacy seriously. This policy outlines how we collect,
                use, and protect your information.
              </span>
            )}
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </footer>
  );
};

export default Footer;
