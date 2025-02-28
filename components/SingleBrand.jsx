import Image from "next/image";
import Carousel from "@/components/Carousel";
import ResourcesSection from "./Resources";
import SocialMedia from "@/components/SocialMedia";
import ItemSlider from "./BrandItemSlider";

const BrandPage = ({ brand }) => {
  return (
    <div className="py-8 pt-28 md:pt-[150px] overflow-hidden">
      {/* Hero Section */}
      <div className="relative w-full h-96">
        <Image src={brand.heroImage} alt={brand.name} layout="fill" objectFit="cover" />
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white text-center p-4">
          <Image src={brand.logo} alt={`${brand.name} Logo`} width={100} height={100} className="mb-4" />
          <h1 className="text-4xl font-bold">{brand.name}</h1>
          <p className="text-lg mt-2">{brand.description}</p>
        </div>
      </div>

      {/* Brand Items Section */}
      <div className="pt-6 md:pt-28 lg:pt-36">
         <ItemSlider items={brand.items} title={brand.name} />
      </div>

      {/* Comments Carousel */}
      <div className="pt-6 md:pt-28 lg:pt-36">
         <Carousel comments={brand.comments} title={"user testimonials"} brandAppearance={false} />
      </div>

      {/* Resources Section */}
      <div className="pt-16 md:pt-28 lg:pt-36">
        <ResourcesSection resources={brand.resources} />
      </div>
      
      {/* Social Media Section */}
      <div className="pt-8 md:pt-20 lg:pt-28 overflow-auto">
        <SocialMedia socials={brand.socials} />
      </div>
    </div>
  );
};

export default BrandPage;
