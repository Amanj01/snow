import Image from "next/image";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Snow Medical Section */}
        <div>
          <h2 className="text-2xl font-bold">Medical community</h2>
          <Image src="/whiteLogo.png" alt="Snow Medical" width={100} height={100} />
          <p className="mt-2 text-white">
            Providing top-tier medical services with a commitment to excellence and care.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-xl font-semibold">Quick Links</h2>
          <ul className="mt-2 space-y-2">
            <li><a href="/" className="text-white hover:text-blue-500">Home</a></li>
            <li><a href="/about-us" className="text-white hover:text-blue-500">About Us</a></li>
            <li><a href="/brands" className="text-white hover:text-blue-500">Brands</a></li>
            <li><a href="/blogs" className="text-white hover:text-blue-500">Blogs</a></li>
            <li><a href="/events" className="text-white hover:text-blue-500">Events</a></li>
            <li><a href="/resources" className="text-white hover:text-blue-500">Resources</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="text-xl font-semibold">Contact</h2>
          <p className="mt-2 text-white">123 Medical Drive, Health City, HC 4567</p>
          <p className="text-white">(555) 123-4567</p>
          <p className="text-white">contact@medicare.org</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-white hover:text-blue-400"><FaFacebookF /></a>
            <a href="#" className="text-white hover:text-blue-400"><FaTwitter /></a>
            <a href="#" className="text-white hover:text-blue-400"><FaInstagram /></a>
            <a href="#" className="text-white hover:text-blue-400"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>
      
      {/* Copyright Section */}
      <div className="text-center mt-8 text-gray-500 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} Snow Medical. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
