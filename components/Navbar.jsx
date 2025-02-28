"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Heart, Pill, Stethoscope, Syringe, Microscope, Activity, ThermometerSun, Snowflake} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNavHovered, setIsNavHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isBrandsDrawerOpen, setIsBrandsDrawerOpen] = useState(false);
  const path = usePathname();

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
    { label: "EVENTS", href: "/events" },
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
    <nav className="w-screen top-0 left-0 bg-transparent absolute z-50">
     <nav className="w-screen container mx-auto">
        <div
          className={`absolute inset-0 w-full bg-white transition-transform duration-500 ease-in-out origin-top -z-10 ${
            isExpanded ? 'scale-y-100' : 'scale-y-0'
          }`}
          style={{
            height: showBrandsDropdown ? 'calc(100% )' : '100%',
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
          <div className="px-2 md:px-0 lg:px-6">
            <div className="flex justify-between items-center h-16">
              <div className="flex-shrink-0 flex items-center">
                {/* logo section */}
              <Link href="/">
                {path == "/" || path.startsWith("/blogs/") || path.startsWith("/events/")?
                <div className="relative">
                <Image
                  width={105}
                  height={60}
                  quality={100}
                  src={"/white.png"}
                  alt="logo"
                  className={`absolute transition-opacity duration-700 ${
                    isExpanded ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <Image
                  width={105}
                  height={60}
                  quality={100}
                  src={"/snow.png"}
                  alt="logo"
                  className={`transition-opacity duration-700 ${
                    isExpanded ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div> :
              <Image width={105} height={60} quality={100} src={"/snow.png"} alt="logo" />
              }
              </Link>
              </div>

              <div className="hidden lg:flex items-center justify-center gap-8">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`menu text-[15px] relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[1px] after:transition-all after:duration-400 after:scale-x-0 hover:after:scale-x-100 ${
                      isExpanded ? "text-gray-800 hover:text-black after:bg-black" : path== "/" || path.startsWith("/blogs/") || path.startsWith("/events/")? "text-white after:bg-black" : "text-black after:bg-black"
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
                  className={`text-[15px] hover:font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[1px] after:transition-all after:duration-400 after:scale-x-0 hover:after:scale-x-100 ${
                    isExpanded ? "text-black after:bg-black" : path== "/" || path.startsWith("/blogs/") || path.startsWith("/events/") ? "text-white after:bg-black" : "text-black after:bg-black"
                  } transition-colors duration-500`}
                >
                  CONTACT
                </Link>
              </div>

              <div className="lg:hidden flex items-center">
                <button
                  onClick={toggleMenu}
                  className={`inline-flex items-center justify-center p-2 rounded-md ${path=="/" || path.startsWith("/blogs/") || path.startsWith("/events/")? "text-white hover:text-gray-100 " : "text-black hover:text-gray-500 "} focus:outline-none`}
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
            <div className="container mx-auto px-4 py-6 flex items-center justify-center h-[100px]">
              <div className="grid grid-cols-4 md:grid-cols-8 gap-6 ">
                {brands.map((brand) => (
                  <Link
                    key={brand.id}
                    href={`/brands/${brand.id}`}
                    className="flex flex-col items-center justify-center px-6 py-2 group"
                  >
                    <brand.Icon size={42} className="text-gray-500 grayscale group-hover:grayscale-0 group-hover:text-blue-600 transition-colors duration-500" />
                    <span className="text-sm mt-2 text-gray-500 grayscale group-hover:grayscale-0 group-hover:text-blue-600 transition-colors duration-500">{brand.name}</span>
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
    </nav>
     
      <BrandsDrawer />
    </>
  );
};

export default Navbar;