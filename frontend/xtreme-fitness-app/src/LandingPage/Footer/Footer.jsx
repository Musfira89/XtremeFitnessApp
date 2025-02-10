import React, { useState } from "react";
import { Instagram } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import logo from "../../../public/LogoWhite.png";
import { HashLink as Link } from "react-router-hash-link";

const Footer = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleOpenModal = (content) => {
    setModalContent(content);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <footer className="bg-[#4F0716] text-white py-10">
      <div className="container mx-auto flex flex-wrap md:flex-nowrap px-6 gap-8">
        {/* Logo and About Section */}
        <div className="w-full md:w-2/5 pr-8 text-left md:text-left">
          <img src={logo} alt="Logo" className="w-48 mx-auto md:mx-0 mb-4" />
          <p className="text-gray-400 text-sm md:text-base">
            Unlock your potential with customized workout and meal plans
            designed just for you. Start your fitness transformation today!
          </p>
        </div>

        {/* Links & Contact Section */}
        <div className="w-full md:w-3/5 flex flex-wrap md:flex-nowrap gap-6 justify-between text-left md:text-left">
          {/* Quick Links */}
          <div className="w-1/2 sm:w-1/3">
            <h4 className="font-semibold text-lg mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  smooth
                  to="/#about-us"
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  smooth
                  to="/#services"
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  smooth
                  to="/#faq"
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  smooth
                  to="/#contact-us"
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div className="w-1/2 sm:w-1/3">
            <h4 className="font-semibold text-lg mb-3">Policies</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleOpenModal("Refund Policy")}
                  className="text-gray-400 hover:text-white"
                >
                  Refund Policy
                </button>
              </li>
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
              <li>
                <button
                  onClick={() => handleOpenModal("Disclaimer")}
                  className="text-gray-400 hover:text-white"
                >
                  Disclaimer
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info & Hours of Operation */}
          <div className="w-full sm:w-1/3 mt-6 sm:mt-0">
            <h4 className="font-semibold text-lg mb-3">Contact Us</h4>
            <p className="text-gray-400 text-sm">
              Phone: <span className="text-white">(800) 383-0689</span>
            </p>
            <p className="text-gray-400 text-sm">
              Email: <span className="text-white">support@xtremeft.com</span>
            </p>
            <div className="flex justify-left sm:justify-start space-x-4 mt-3">
              <a
                href="https://www.instagram.com/xtreme_fitness/"
                target="_blank"
                rel="noreferrer"
              >
                <Instagram className="text-gray-400 hover:text-white w-6 h-6" />
              </a>
            </div>

            {/* Hours of Operation */}
            <div className="mt-6">
              <h4 className="font-semibold text-lg mb-2">Hours of Operation</h4>
              <p className="text-gray-400 text-sm">
                Monday - Friday: 6am - 6pm
              </p>
              <p className="text-gray-400 text-sm">Saturday: 9am - 3pm</p>
              <p className="text-gray-400 text-sm">Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400 text-xs sm:text-sm">
        © {new Date().getFullYear()} Xtreme Fitness. All rights reserved.
      </div>

      {/* Modal for displaying content */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle className="text-lg font-bold">{modalContent}</DialogTitle>
        <DialogContent>
          {modalContent === "Refund Policy" && (
            <div className="p-4 text-sm text-red-600 font-semibold">
              <p className="mb-4">
                Xtreme Fitness Training offers a <strong>3-day trial</strong> of
                our training programs to experience the benefits firsthand.
                During this trial period, you will have access to our
                personalized plan and dashboard to help you kickstart your
                fitness journey.
              </p>

              <p className="mb-4">
                Please note that the <strong>3-day trial offer</strong> is a{" "}
                <strong>one-time opportunity</strong>
                for new clients only. At the end of the trial period, you will
                have the option to continue with our training programs by
                purchasing a program.
              </p>

              <p className="mb-4">
                It is important to understand that all purchases made for our
                training programs, following the trial period, are{" "}
                <strong>non-refundable</strong>. Once payment is processed,
                there will be <strong>no refunds</strong> issued for any reason.
              </p>

              <p className="mb-4">
                We are dedicated to providing you with the best fitness
                experience possible and are committed to helping you achieve
                your goals. If you have any questions or concerns, please do not
                hesitate to contact us.
              </p>

              <p className="mb-4">
                By participating in the <strong>3-day trial offer</strong> and
                purchasing our training programs, you acknowledge and agree to
                our <strong>no refund policy</strong>. Thank you for choosing
                Xtreme Fitness Training.
              </p>
            </div>
          )}

          {modalContent === "Terms & Conditions" && (
            <div className="p-4 text-sm">
              <p className="mb-4">
                Xtreme Fitness Training LLC (“Xtreme Fitness”, “we”, “us”,
                “our”) provides online fitness training and products
                (“Services”) to our customers through our website. These Terms
                of Service (“Terms”) apply to all visitors, customers, and
                others who access or use our Services. By accessing or using our
                Services, you agree to be bound by these Terms. If you disagree
                with any part of the Terms, you do not have permission to access
                or use the Services.
                <br />
                <br />
                <strong>1. Use of Services:</strong> You must be at least 18
                years old to use our Services. You may not use our Services for
                any illegal or unauthorized purpose and are responsible for
                complying with all applicable laws. You agree to not reproduce,
                duplicate, copy, or resell any portion of our Services, exploit
                them for commercial purposes, access non-public areas, interfere
                with operations, attempt unauthorized searches, forge headers,
                use hidden metadata, engage in fraudulent or unlawful
                activities, send unsolicited emails, or transmit harmful
                software.
                <br />
                <br />
                <strong>2. Content:</strong> We reserve the right to remove any
                content that violates these Terms, our Privacy Policy, or
                applicable laws. You are solely responsible for the content you
                post.
                <br />
                <br />
                <strong>3. Payments:</strong> You are responsible for all
                applicable taxes and fees. By using our Services, you agree to a
                recurring billing agreement with Xtreme Fitness Training LLC.
                <br />
                <br />
                <strong>4. Termination:</strong> We may terminate or suspend
                your access immediately for any reason, including violation of
                these Terms. Provisions regarding ownership, warranties,
                indemnity, and liability limitations will survive termination.
                <br />
                <br />
                <strong>5. Disclaimer of Warranties:</strong> Our Services are
                provided “as is,” without warranties of any kind, including
                merchantability, fitness for a particular purpose, or
                uninterrupted availability.
                <br />
                <br />
                <strong>6. Limitation of Liability:</strong> Xtreme Fitness
                Training LLC and its affiliates shall not be liable for
                indirect, incidental, or consequential damages, including loss
                of profits, data, or goodwill, arising from access or use of
                Services, third-party content, or unauthorized access to
                transmissions.
                <br />
                <br />
                <strong>7. Governing Law:</strong> These Terms are governed by
                the laws of Pennsylvania, USA. Failure to enforce any provision
                shall not constitute a waiver. If any part is deemed invalid,
                the remaining Terms remain in effect.
                <br />
                <br />
                <strong>8. Changes:</strong> We may modify these Terms at our
                discretion. Material changes will be notified at least 30 days
                in advance. Continued use after revisions constitutes acceptance
                of the new Terms.
                <br />
                <br />
                <strong>9. Contact Us:</strong> For questions, contact us at{" "}
                <a href="mailto:support@xtremeft.com">support@xtremeft.com</a>.
              </p>
            </div>
          )}

          {modalContent === "Privacy Policy" && (
            <div className="p-4 text-sm space-y-4">
              <p className="font-semibold">Privacy Policy</p>
              <p>
                Xtreme Fitness Training LLC is committed to protecting your
                privacy. We provide this Privacy Policy to inform you of our
                policies and procedures regarding the collection, use, and
                disclosure of personal information we receive from users of our
                website located at www.xtremeft.com (the “Site”).
              </p>
              <p className="font-semibold">Data Collection</p>
              <p>
                When you visit and use the Site, we may collect certain data
                from you. This includes, but is not limited to, information
                about your IP address, operating system, browser type, and other
                technical details about your interaction with the Site.
              </p>
              <p>
                We may also collect personal information such as your name,
                email address, phone number, and any other information you
                choose to provide us.
              </p>
              <p className="font-semibold">Cookies and Tracking</p>
              <p>
                We may use cookies to track your activity on our Site and
                collect data to improve our services.
              </p>
              <p className="font-semibold">Contact Us</p>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us at support@xtremeft.com.
              </p>
            </div>
          )}
          {modalContent === "Disclaimer" && (
            <div className="p-4 text-sm">
              <p className="mb-4">
                By participating in any online fitness training program hosted
                by Xtreme Fitness Training LLC, you acknowledge that you have
                read and agree to the following disclaimer:
                <br />
                <br />
                <strong>1.</strong> You are participating in the program
                voluntarily and at your own risk, and you assume all
                responsibility for any injuries or damages that may occur as a
                result of participating in the program.
                <br />
                <br />
                <strong>2.</strong> You are responsible for your own safety and
                well-being, and should follow all safety guidelines and
                protocols provided in the program.
                <br />
                <br />
                <strong>3.</strong> You should consult a physician before
                beginning any physical activity, and should not participate in
                the program if you are suffering from a physical or mental
                illness.
                <br />
                <br />
                <strong>4.</strong> The online fitness training programs are not
                intended to diagnose, treat, cure, or prevent any medical
                condition, and no advice or information provided should be used
                as a substitute for medical advice.
                <br />
                <br />
                <strong>5.</strong> .Xtreme Fitness Training LLC is not
                responsible for any damages or injuries that may result from
                your participation in the program.
                <br />
                <br />
                By participating in this program, you agree to these terms and
                conditions, and acknowledge that you are doing so at your own
                risk.
              </p>
            </div>
          )}
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
