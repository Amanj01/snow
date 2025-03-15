  import BrandPage from '@/components/SingleBrand'
  import React, { Suspense } from 'react'
  import { getBrand } from '@/api-requests/apiReq'

export const metadata = {
  title: 'Snow || Brand',
  description: 'Brand',
};

const Loading = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-pulse text-2xl font-mansory uppercase text-black">
      Loading The Brand...
    </div>
  </div>
);

  const SingleBrandPage = async ({params}) => {
    const resolvedParams = await params;
    const brandId = resolvedParams['single-brand']
    const brand = await getBrand(brandId)

    return (
      <Suspense fallback={<Loading />}>
        <BrandPage brand={brand} />
      </Suspense>
    )
  }

  export default SingleBrandPage