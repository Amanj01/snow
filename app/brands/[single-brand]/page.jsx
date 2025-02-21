import Image from "next/image";
import BrandItems from "@/components/BrandItems";
import Carousel from "@/components/Carousel";
import ResourcesSection from "@/components/ResourcesSection";
import SocialMedia from "@/components/SocialMedia";

const BrandPage = ({ brand }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative w-full h-96">
        <Image src={brand.heroImage} alt={brand.name} layout="fill" objectFit="cover" className="rounded-lg" />
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white text-center p-4">
          <Image src={brand.logo} alt={`${brand.name} Logo`} width={100} height={100} className="mb-4" />
          <h1 className="text-4xl font-bold">{brand.name}</h1>
          <p className="text-lg mt-2">{brand.description}</p>
        </div>
      </div>

      {/* Brand Items Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Our Products</h2>
        <BrandItems items={brand.items} />
      </div>

      {/* Comments Carousel */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">What People Say</h2>
        <Carousel comments={brand.comments} />
      </div>

      {/* Resources Section */}
      <ResourcesSection resources={brand.resources} />

      {/* Social Media Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
        <SocialMedia socials={brand.socials} />
      </div>
    </div>
  );
};

export default BrandPage;
