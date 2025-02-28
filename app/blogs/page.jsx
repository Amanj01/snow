import BlogAndEventTemplate from '@/components/BlogAndEventTemplate';
import { sampleBlogPosts } from '@/lib/blog-event-data';
import Head from 'next/head';
const BlogPage = ({ blogPosts }) => {
  return (
    <>
    <Head>
    <title>Snow Blogs || Snow Medical</title>
    <meta name="description" content="Read our latest blog posts on snow medical." />
    </Head>

    <BlogAndEventTemplate 
    items={sampleBlogPosts}
    title="BLOG"
    itemsCountText={`(${sampleBlogPosts.length}) POSTS`}
    buttonText="VIEW ALL BLOGS"
    itemLinkPrefix="/blogs"
    accentColor="bg-blue-600"
    textAccentColor="text-blue-600"
    />

    </>

  );
};

export default BlogPage;