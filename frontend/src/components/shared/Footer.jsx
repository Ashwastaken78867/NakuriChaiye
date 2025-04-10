import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* About Section */}
                <div>
                    <h2 className="text-xl font-bold text-white">About Us</h2>
                    <p className="text-sm mt-3 leading-relaxed">
                        We connect talented individuals with top companies, providing the best job opportunities in various industries.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h2 className="text-xl font-bold text-white">Quick Links</h2>
                    <ul className="mt-3 space-y-2">
                        <li><Link to="/about" className="hover:text-white transition">About</Link></li>
                        <li><Link to="/jobs" className="hover:text-white transition">Jobs</Link></li>
                        <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
                        <li><Link to="/faq" className="hover:text-white transition">FAQ</Link></li>
                    </ul>
                </div>

                {/* Contact & Socials */}
                <div>
                    <h2 className="text-xl font-bold text-white">Contact Us</h2>
                    <p className="text-sm mt-3">Email: support@jobportal.com</p>
                    <p className="text-sm">Phone: +1 (800) 123-4567</p>

                    {/* Social Media Icons */}
                    <div className="flex gap-4 mt-4">
                        <a href="#" className="text-gray-400 hover:text-white transition">
                            <FaFacebookF size={20} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition">
                            <FaTwitter size={20} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition">
                            <FaLinkedinIn size={20} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition">
                            <FaInstagram size={20} />
                        </a>
                    </div>
                </div>

            </div>

            {/* Copyright */}
            <div className="text-center text-sm text-gray-500 mt-8 border-t border-gray-700 pt-5">
                &copy; {new Date().getFullYear()} JobPortal. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
