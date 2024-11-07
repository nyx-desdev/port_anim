"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react";

export default function Footer() {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <footer ref={footerRef} className="bg-black text-white py-12">
      <motion.div
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center"
          variants={containerVariants}
        >
          <motion.div className="mb-8 md:mb-0" variants={itemVariants}>
            <h2 className="text-2xl font-bold mb-4 text-yellow-500">
              Connect With Us
            </h2>
            <div className="flex space-x-4">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Instagram, label: "Instagram" },
              ].map(({ Icon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  className="text-white hover:text-blue-400 transition-colors duration-300"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={label}
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            {/* <h2 className="text-2xl font-bold mb-4">Contact Us</h2> */}
            <motion.div
              className="flex items-center mb-2"
              variants={itemVariants}
            >
              <Mail className="w-5 h-5 mr-2" />
              <a href="mailto:info@example.com" className="hover:underline">
                nikhilknick@gmail.com
              </a>
            </motion.div>
            <motion.div className="flex items-center" variants={itemVariants}>
              <Phone className="w-5 h-5 mr-2" />
              <a href="tel:+1234567890" className="hover:underline">
                +91 9879879879
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div
          className="mt-8 text-center text-sm"
          variants={itemVariants}
        >
          © {new Date().getFullYear()} Nikhil Arya. All rights reserved.
        </motion.div>
      </motion.div>
    </footer>
  );
}
