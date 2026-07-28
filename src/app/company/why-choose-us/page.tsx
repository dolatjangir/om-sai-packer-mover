import React from 'react'

import { getPageBlogs } from '../../../../lib/blogs';
import { generateSEOMetadata } from '../../../../lib/seometadata';
import RelatedBlogs from '@/components/related-blogs';
import WhyChooseUs from './clientChooseUs';


export const dynamic = 'force-dynamic';
export const generateMetadata = generateSEOMetadata;
export default async function page() {
   const blogs = await getPageBlogs('why-choose-us');
  return (
    <>
    <WhyChooseUs/>
      <RelatedBlogs blogs={blogs} />
                      </>
  )
}
