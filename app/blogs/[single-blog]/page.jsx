"use client";

import SingleItem from '@/components/SingleItemPattern';
import { blogData } from '@/lib/singlePage-blog-data';

  const BlogPostPage= () => {
  
  return <SingleItem data={blogData} type="blog" />;
}

export default BlogPostPage;