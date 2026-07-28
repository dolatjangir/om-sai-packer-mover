import React from 'react'
import BikeCourierPage from './clientBike'
import { generateSEOMetadata } from '../../../../lib/seometadata';
import { getPageBlogs } from '../../../../lib/blogs';
import RelatedBlogs from '@/components/related-blogs';

export const dynamic = 'force-dynamic';
export const generateMetadata = generateSEOMetadata;
export default async function page() {
   const blogs = await getPageBlogs('bike-courier');
  return (
    <>
    <BikeCourierPage/>
     <RelatedBlogs blogs={blogs} />
                  </>
  )
}
