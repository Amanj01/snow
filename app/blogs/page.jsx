import BlogAndEventTemplate from '@/components/BlogAndEventTemplate';
import { sampleBlogPosts } from '@/lib/blog-event-data';
const BlogPage = ({ blogPosts }) => {
  return (
    <BlogAndEventTemplate 
      items={sampleBlogPosts}
      title="BLOG"
      itemsCountText={`(${sampleBlogPosts.length}) POSTS`}
      buttonText="VIEW ALL BLOGS"
      itemLinkPrefix="/blogs"
      accentColor="bg-blue-600"
      textAccentColor="text-blue-600"
    />
  );
};

export default BlogPage;