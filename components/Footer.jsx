import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-8 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-semibold mb-4">MediCare Community</h3>
            <p className="text-white text-md leading-relaxed">
              Dedicated to advancing healthcare through education, research, and community outreach. 
              Together for a healthier tomorrow.
            </p>
          </div>

          {/* Quick Links */}
          <div className="mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About Us', 'Services', 'Blog'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white hover:text-white text-md transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-white">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="flex-shrink-0" />
                <span className="text-md">123 Medical Drive, Health City, HC 4567</span>
              </div>
              <div className="flex items-center gap-2">
                <FaPhone className="flex-shrink-0" />
                <span className="text-md">(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="flex-shrink-0" />
                <span className="text-md">contact@medicare.org</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {[
                { icon: FaFacebook, name: 'Facebook' },
                { icon: FaTwitter, name: 'Twitter' },
                { icon: FaLinkedin, name: 'LinkedIn' },
                { icon: FaInstagram, name: 'Instagram' },
              ].map((SocialIcon) => (
                <a
                  key={SocialIcon.name}
                  href="#"
                  className="text-white hover:text-blue-400 transition-colors"
                  aria-label={SocialIcon.name}
                >
                  <SocialIcon.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-md text-gray-300">
            © {new Date().getFullYear()} MediCare Community. All rights reserved.
          </p>
          <p className="text-xs text-gray-300 mt-2">
            <a href="#" className="hover:text-gray-300">Privacy Policy</a> | 
            <a href="#" className="hover:text-gray-300 ml-2">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
};


export default Footer;