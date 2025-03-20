import React, { Suspense } from 'react';
import Hero from '@/components/Hero';
import BrandItems from '@/components/BrandItems';
import LogoSlider from '@/components/LogoBrandsSlider';
import Carousel from '@/components/Carousel';
import { getActiveHomes } from '@/api-requests/apiReq';
import Loading from '@/components/Loading';

export const metadata = {
  title: 'Snow || Home',
  description: 'Discover the latest trends and styles from Snow Medical',
  keywords: ['snow medical', 'home', 'Medical brands', 'Medical products']
};

const HomeContent = async () => {
  const activeHomes = await getActiveHomes();
  const carouselLenght = activeHomes.comments.length;  
  return (
    <>
      <Hero data={activeHomes} />
      <div className='pt-16 md:pt-28 lg:pt-36'>
        <BrandItems data={activeHomes.items} />
      </div>
      {carouselLenght > 0 && (
      <div className='pt-16 md:pt-28 lg:pt-36'>
        <Carousel comments={activeHomes.comments} title={"user testimonials"} brandAppearance={true} />
      </div>
      )}
      <div className='py-12 md:pb-24 md:pt-36'>
        <LogoSlider data={activeHomes.brands} />
      </div>
    </>
  );
};

const Page = () => {
  return (
    <div className=''>
      <Suspense fallback={<Loading />}>
        <HomeContent />
      </Suspense>
    </div>
  );
};

export default Page;
