"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Heart, Pill, Stethoscope, Syringe, Microscope, Activity, ThermometerSun, Snowflake} from "lucide-react";
import Image from "next/image";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNavHovered, setIsNavHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isBrandsDrawerOpen, setIsBrandsDrawerOpen] = useState(false);

  // Local medical brands data
  const brands = [
    {
      id: 1,
      name: "HealthPlus",
      Icon: Heart,
      color: "#FF4757"
    },
    {
      id: 2,
      name: "MediCare",
      Icon: Pill,
      color: "#2ED573"
    },
    {
      id: 3,
      name: "DocCare",
      Icon: Stethoscope,
      color: "#1E90FF"
    },
    {
      id: 4,
      name: "VitalPharm",
      Icon: Syringe,
      color: "#5352ED"
    },
    {
      id: 6,
      name: "LabTech",
      Icon: Microscope,
      color: "#A3CB38"
    },
    {
      id: 7,
      name: "VitalMetrics",
      Icon: Activity,
      color: "#5F27CD"
    },
    {
      id: 8,
      name: "CryoTech",
      Icon: ThermometerSun,
      color: "#54A0FF"
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { label: "HOME", href: "/" },
    { label: "ABOUT", href: "/about-us" },
    { label: "BRANDS", href: "#", isBrands: true },
    { label: "BLOGS", href: "/blogs" },
    { label: "RESOURCES", href: "/resources" },
  ];

  const handleMenuItemClick = (item) => {
    if (item.isBrands && (isMobile || window.innerWidth < 1024)) {
      setIsBrandsDrawerOpen(true);
      setIsOpen(false);
    }
  };

  const BrandsDrawer = () => (
    <div className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
      isBrandsDrawerOpen ? "translate-x-0 bg-white" : "translate-x-full"
    }`}>
      <div className="flex flex-col h-full">
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsBrandsDrawerOpen(false)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex-grow px-4 py-6 overflow-y-auto">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/brands/${brand.id}`}
              className="pb-8 text-3xl hover:text-gray-700 text-black flex items-center gap-4"
              onClick={() => setIsBrandsDrawerOpen(false)}
            >
              <brand.Icon size={24} color={brand.color} />
              {brand.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  const showBrandsDropdown = hoveredItem === "BRANDS" && !isMobile;
  const isExpanded = (isNavHovered || hoveredItem) && !isMobile;

  return (
    <>
      <nav className="w-full top-0 left-0 bg-transparent z-50 fixed">
        <div
          className={`absolute inset-0 w-full bg-white transition-transform duration-500 ease-in-out origin-top -z-10 ${
            isExpanded ? 'scale-y-100' : 'scale-y-0'
          }`}
          style={{
            height: showBrandsDropdown ? 'calc(100% + 60px)' : '100%',
            transition: 'transform 500ms ease-in-out, height 500ms ease-in-out'
          }}
        />

        <div
          className="relative"
          onMouseEnter={() => !isMobile && setIsNavHovered(true)}
          onMouseLeave={() => {
            if (!isMobile) {
              setIsNavHovered(false);
              setHoveredItem(null);
            }
          }}
        >
          <div className="px-4 md:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/">
                  <div className="flex items-center gap-2">
                  <Snowflake color={`${isExpanded? "black":"white"}`} size={36} /> 
                  <p className={`${isExpanded? "text-black":"text-white"}`}>SNOW</p>
                  </div>
                </Link>
              </div>

              <div className="hidden lg:flex items-center justify-center gap-8">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`menu text-md relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[1px] after:transition-all after:duration-400 after:scale-x-0 hover:after:scale-x-100 ${
                      isExpanded ? "text-gray-800 hover:text-black after:bg-black" : "text-white after:bg-white"
                    } transition-colors duration-500`}
                    onMouseEnter={() => setHoveredItem(item.label)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="hidden lg:flex items-center">
                <Link
                  href="/contact"
                  className={`text-sm hover:font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[1px] after:transition-all after:duration-400 after:scale-x-0 hover:after:scale-x-100 ${
                    isExpanded ? "text-black after:bg-black" : "text-white after:bg-white"
                  } transition-colors duration-500`}
                >
                  CONTACT
                </Link>
              </div>

              <div className="lg:hidden flex items-center">
                <button
                  onClick={toggleMenu}
                  className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-500 focus:outline-none"
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>

          <div
            className={`w-full overflow-hidden transition-all duration-500 ease-in-out ${
              showBrandsDropdown ? 'opacity-100 max-h-[110px]' : 'opacity-0 max-h-0'
            }`}
            onMouseEnter={() => setHoveredItem("BRANDS")}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="container mx-auto px-4 py-6 flex items-center justify-center h-[100px] bg-slate-100">
              <div className="grid grid-cols-4 md:grid-cols-8 gap-6 ">
                {brands.map((brand) => (
                  <Link
                    key={brand.id}
                    href={`/brands/${brand.id}`}
                    className="flex flex-col items-center justify-center px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-blue-100"
                  >
                    <brand.Icon size={32} color={brand.color} />
                    <span className="text-sm mt-2 text-gray-700">{brand.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
            isOpen ? "translate-x-0 bg-white" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-end p-4">
              <button
                onClick={toggleMenu}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <X size={30} />
              </button>
            </div>

            <div className="flex-grow px-4 py-6 overflow-y-auto">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block pb-8 md:pb-12 text-4xl md:text-6xl hover:text-black text-gray-800"
                  onClick={() => {
                    handleMenuItemClick(item);
                    if (!item.isBrands) toggleMenu();
                  }}
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/contact"
                className="block text-4xl md:text-6xl hover:text-black text-gray-800"
                onClick={toggleMenu}
              >
                CONTACT
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <BrandsDrawer />
    </>
  );
};

export default Navbar;