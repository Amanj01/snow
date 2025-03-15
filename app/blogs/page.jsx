import BlogAndEventTemplate from '@/components/BlogAndEventTemplate';
import { getAllBlogsAndEvents } from '@/api-requests/apiReq';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata = {
  title: 'Snow Blogs || Snow Medical',
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
  // Get the page from URL query params or default to 1
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const pageSize = 6;
  
  const response = await getAllBlogsAndEvents(page, pageSize, "blogs");
  const data = response.data;
  const totalPages = response.meta.totalPages;

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
};

export default BlogPage;
