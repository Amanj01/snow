import BlogAndEventTemplate from "@/components/BlogAndEventTemplate";
import { getAllBlogsAndEvents } from '@/api-requests/apiReq';
import { Suspense } from "react";

export const metadata = {
  title: 'Snow Events || Snow Medical',
  description: 'Read our latest events on snow medical.',
};

const Loading = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-pulse text-2xl font-mansory uppercase text-black">
      Loading Events Of Snow Medical...
    </div>
  </div>
);


const EventsPage = async ({ searchParams }) => {
    // Get the page from URL query params or default to 1
    const params = await searchParams;
    const pageParam = params?.page;
    const page = pageParam ? parseInt(pageParam) : 1;
    const pageSize = 6;
    
    const response = await getAllBlogsAndEvents(page, pageSize, "events");
    const data = response.data;
    const totalPages = response.meta.totalPages;


  return (
    <Suspense fallback={<Loading />}>
      <div className='pb-24 pt-28 md:pt-32 lg:pt-36'>
      <BlogAndEventTemplate 
      initialData={data}
      initialTotalPages={totalPages}
      title="EVENTS"
       buttonText="VIEW ALL EVENTS"
      itemLinkPrefix="events"
      accentColor="bg-red-500"  // Different accent color for events
      textAccentColor="text-[#FF4500]"
      itemsPerPage={pageSize}
      />
      </div>
    </Suspense>
  );
};

export default EventsPage;