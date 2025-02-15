import React, { useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { motion } from "framer-motion";
import logo from "../../../public/Logo.png"; // Adjust path if needed

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
     <div className="bg-gray-200 text-gray-800 text-center py-2 text-sm md:text-base font-semibold shadow-lg">
  <p className="tracking-wide">Register now and get a <span className="text-red-700">3-day trial</span></p>
</div>


      <header className="bg-[#3A3838] text-white w-full top-0 left-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-12 md:h-14" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm">
            <Link to="/" className="hover:text-red-500">
              HOME
            </Link>
            <Link smooth to="/#products" className="hover:text-red-500">
              PRODUCTS
            </Link>
            <Link smooth to="/#about-us" className="hover:text-red-500">
              ABOUT US
            </Link>
            <Link to="/success-stories" className="hover:text-red-500">
              SUCCESS STORIES
            </Link>
            <Link to="/trainer" className="hover:text-red-500">
              TRAINER
            </Link>
            <Link smooth to="/#services" className="hover:text-red-500">
              SERVICES
            </Link>
            <Link smooth to="/#pricing" className="hover:text-red-500">
              PRICING
            </Link>
            <Link smooth to="/#faq" className="hover:text-red-500">
              FAQs
            </Link>
            <Link smooth to="/#contact-us" className="hover:text-red-500">
              CONTACT US
            </Link>
          </nav>

          {/* Register Button */}
          <Link
            to="/signup"
            className="hidden md:block bg-red-700 px-7 py-3 rounded-md text-sm font-semibold hover:bg-red-700"
          >
            REGISTER
          </Link>

          {/* Mobile Menu Icon */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
        {menuOpen && (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
    className="md:hidden bg-[#0A0E17] text-white fixed top-0 left-0 w-64 max-w-[80%] h-screen shadow-lg z-50 flex flex-col"
  >
    {/* Close Button */}
    <button onClick={() => setMenuOpen(false)} className="absolute top-4 right-4 text-white text-xl">
      ✕
    </button>

    {/* Mobile Menu */}
    <nav className="flex flex-col items-start py-6 px-4 space-y-4 mt-12">
      <Link to="/" className="text-md hover:text-red-500" onClick={() => setMenuOpen(false)}>Home</Link>
      <Link smooth to="/#products"  className="text-md hover:text-red-500" onClick={() => setMenuOpen(false)}>Products</Link>
      <Link smooth to="/#about-us"  className="text-md hover:text-red-500" onClick={() => setMenuOpen(false)}>About Us</Link>
      <Link to="/success-stories" className="text-md hover:text-red-500" onClick={() => setMenuOpen(false)}>Success Stories</Link>
      <Link smooth to="/#services"  className="text-md hover:text-red-500" onClick={() => setMenuOpen(false)}>Services</Link>
      <Link smooth to="/#pricing" className="text-md hover:text-red-500" onClick={() => setMenuOpen(false)}>Pricing</Link>
      <Link smooth to="/#faq" className="text-md hover:text-red-500" onClick={() => setMenuOpen(false)}>FAQs</Link>
      <Link smooth to="/#contact-us" className="text-md hover:text-red-500" onClick={() => setMenuOpen(false)}>Contact Us</Link>

      {/* Smaller Sign Up Button */}
      <Link to="/signup" className="bg-red-600 px-6 py-2 rounded-md font-semibold text-white text-sm hover:bg-red-700 transition w-auto text-center">
        RESGISTER
      </Link>
    </nav>
  </motion.div>
)}

      </header>
    </>
  );
};

export default Navbar;
