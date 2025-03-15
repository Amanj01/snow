import BlogAndEventTemplate from '@/components/BlogAndEventTemplate';
import { getAllBlogsAndEvents } from '@/api-requests/apiReq';
import { Suspense } from 'react';

export const metadata = {
  title: 'Snow || Blogs',
  description: 'Read our latest blog posts on snow medical.',
};

const Loading = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-pulse text-2xl font-mansory uppercase text-black">
      Loading Blogs Of Snow Medical...
    </div>
  </div>
);

const BlogPage = async ({ searchParams }) => {
  try {
    // Get the page from URL query params or default to 1
    const params = await searchParams;
    const pageParam = params?.page;
    const page = pageParam ? parseInt(pageParam) : 1;
    const pageSize = 6;
    
    const response = await getAllBlogsAndEvents(page, pageSize, "blogs");
    const data = response.data || [];
    const totalPages = response?.meta?.totalPages || 1;

    return (
      <Suspense fallback={<Loading />}>
        <div className='pb-24 pt-28 md:pt-32 lg:pt-36'>
          <BlogAndEventTemplate
            initialData={data}
            initialTotalPages={totalPages}
            title="BLOG"
            itemLinkPrefix="blogs"
            accentColor="#0052CC"
            textAccentColor="text-[#0052CC]"
            itemsPerPage={pageSize}
          />
        </div>
      </Suspense>
    );
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl font-mansory uppercase text-black">
          Failed to load blogs. Please try again later.
        </div>
      </div>
    );
  }
};

export default BlogPage;
