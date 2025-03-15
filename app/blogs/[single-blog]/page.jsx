import SingleItem from '@/components/SingleItemPattern';
import { getBlog } from '@/api-requests/apiReq';
import { Suspense } from 'react';

export const metadata = {
  title: 'Blog Post',
  description: 'Blog Post',
};

const Loading = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-pulse text-2xl font-mansory uppercase text-black">
      Loading The Blog...
    </div>
  </div>
);
  const BlogPostPage= async ({params}) => {
    const resolvedParams = await params;
    const blogId = resolvedParams['single-blog'];
  const blog = await getBlog(blogId);   

  return (
  <Suspense fallback={<Loading />}>
    <SingleItem data={blog} type="blog" />;
  </Suspense>
  )
}

export default BlogPostPage;