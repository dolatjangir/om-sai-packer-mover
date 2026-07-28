import React from 'react'
import VehicleShipping from './clientShipping'
import { generateSEOMetadata } from '../../../../lib/seometadata';
import { getPageBlogs } from '../../../../lib/blogs';
import RelatedBlogs from '@/components/related-blogs';


export const dynamic = 'force-dynamic';
export const generateMetadata = generateSEOMetadata;
export default async function page() {
   const blogs = await getPageBlogs('vehicle-shipping');
  return (
    <>
   <VehicleShipping/>
     <RelatedBlogs blogs={blogs} />
              </>
  )
}
