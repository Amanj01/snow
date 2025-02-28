"use client";

import SingleItem from '@/components/SingleItemPattern';
import { blogData } from '@/lib/singlePage-blog-data';
import Head from 'next/head';

  const BlogPostPage= () => {
  
  return (
  <>
  <Head> 
  <title>Snow Blogs || Snow Medical</title>
  <meta name="description" content="Read our latest blog posts on snow medical." />
  </Head>
  
  <SingleItem data={blogData} type="blog" />;
  </>
  )
}

export default BlogPostPage;