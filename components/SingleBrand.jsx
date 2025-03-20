import Image from "next/image";
import Carousel from "@/components/Carousel";
import ResourcesSection from "./Resources";
import SocialMedia from "@/components/SocialMedia";
import ItemSlider from "./BrandItemSlider";

const BrandPage = ({ brand }) => {
  const commentsLenght = brand.comments.length;
  const resourcesLenght = brand.resources.length;
  const socialsLenght = brand.socials.length;
  console.log("brands detail", commentsLenght, resourcesLenght, socialsLenght);
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
                width={200} 
                height={200} 
                objectFit="cover"
                className="mx-auto"
              />
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-mansory uppercase mb-4">
                {brand.name}
              </h1>
              <p className="text-lg mt-2 max-w-6xl mx-auto px-3 md:px-6">{brand.description}</p>
          </div>
        </div>

      {/* Brand Items Section */}
      <div className="pt-6 md:pt-28 lg:pt-36">
         <ItemSlider items={brand.items} title={brand.name} />
      </div>

      {/* Comments Carousel */}
      {commentsLenght > 0 &&(
        <div className="pt-6 md:pt-28 lg:pt-36">
          <Carousel comments={brand.comments} title={"user testimonials"} brandAppearance={false} />
        </div>
      )}
      {/* Resources Section */}
      {resourcesLenght > 0 &&(
      <div className="pt-16 md:pt-28 lg:pt-36">
        <ResourcesSection initialResources={brand.resources} />
      </div>
      )}
    
      {/* Social Media Section */}
      {socialsLenght > 0 &&(
      <div className="pt-8 md:pt-20 lg:pt-28 overflow-auto">
        <SocialMedia socials={brand.socials} />
      </div>
      )}
    </div>
  );
};

export default BrandPage;
