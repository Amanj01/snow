import Image from "next/image";
import Carousel from "@/components/Carousel";
import ResourcesSection from "./Resources";
import SocialMedia from "@/components/SocialMedia";
import ItemSlider from "./BrandItemSlider";

const BrandPage = ({ brand }) => {
  return (
    <div className="overflow-hidden pb-8 md:pb-16 lg:pb-24">
      {/* Hero Section */}
      <div className="w-full h-screen relative">
          <Image 
            src={process.env.NEXT_PUBLIC_API_URL+brand.heroImage} 
            alt={brand.name} 
            layout="fill" 
            objectFit="cover"
            className="w-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-65 flex flex-col items-center justify-center text-white">
              <Image 
                src={process.env.NEXT_PUBLIC_API_URL+brand.logo} 
                alt={`${brand.name} Logo`} 
                width={100} 
                height={100} 
                className="mb-6 mx-auto"
              />
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-mansory uppercase mb-4">
                {brand.name}
              </h1>
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
        <ResourcesSection initialResources={brand.resources} />
      </div>
      
      {/* Social Media Section */}
      <div className="pt-8 md:pt-20 lg:pt-28 overflow-auto">
        <SocialMedia socials={brand.socials} />
      </div>
    </div>
  );
};

export default BrandPage;
