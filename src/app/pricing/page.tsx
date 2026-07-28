import React from 'react'
import Pricing from './clientPricing'
import { generateSEOMetadata } from '../../../lib/seometadata';
import { getPageBlogs } from '../../../lib/blogs';
import RelatedBlogs from '@/components/related-blogs';


export const dynamic = 'force-dynamic';
export const generateMetadata = generateSEOMetadata;
export default async function page() {
    const blogs = await getPageBlogs('pricing');
  return (
    <>  
   <Pricing/>
    <RelatedBlogs blogs={blogs} />
    </>
  )
}
