import React, { Suspense } from 'react'
import { getEvent } from '@/api-requests/apiReq';
import SingleItem from '@/components/SingleItemPattern'
import { Metadata } from 'next';

export const metadata = {
  title: 'Snow Event || Snow Medical',
  description: 'Read our latest events on snow medical.',
};

const Loading = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-pulse text-2xl font-mansory uppercase text-black">
      Loading The Event...
    </div>
  </div>
);

const SingleEventPage = async ({params}) => {
  const resolvedParams = await params;
  const paramsId = resolvedParams['single-event'];
  const eventData = await getEvent(paramsId);
 
  return(
    <Suspense fallback={<Loading />}>
      <SingleItem data={eventData} type="event" />;  
    </Suspense>
  ) 
}

export default SingleEventPage