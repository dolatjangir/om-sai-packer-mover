import React from 'react'
import FAQPage from './clientFaq'
import RelatedBlogs from '@/components/related-blogs'
import { getPageBlogs } from '../../../../lib/blogs';
import { generateSEOMetadata } from '../../../../lib/seometadata';


export const dynamic = 'force-dynamic';
export const generateMetadata = generateSEOMetadata;
export default async function page() {
   const blogs = await getPageBlogs('faq');
  return (
   <>
        <FAQPage/>
       <RelatedBlogs blogs={blogs} />
       </>
  )
}
