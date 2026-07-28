import React from 'react'
import ResidentialMoving from './clientMove'
import { generateSEOMetadata } from '../../../../lib/seometadata';
import RelatedBlogs from '@/components/related-blogs';
import { getPageBlogs } from '../../../../lib/blogs';


export const dynamic = 'force-dynamic';
export const generateMetadata = generateSEOMetadata;
export default async function page() {
   const blogs = await getPageBlogs('residental-moving');
  return (
    <>
    <ResidentialMoving/>
        <RelatedBlogs blogs={blogs} />
           </>
  )
}
