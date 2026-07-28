import React from 'react'
import LongDistanceMoves from './clientDistence'
import RelatedBlogs from '@/components/related-blogs'
import { getPageBlogs } from '../../../../lib/blogs';
import { generateSEOMetadata } from '../../../../lib/seometadata';


export const dynamic = 'force-dynamic';
export const generateMetadata = generateSEOMetadata;
export default async function page() {
     const blogs = await getPageBlogs('long-distance-moves');
  return (
    <>
   <LongDistanceMoves/>
    <RelatedBlogs blogs={blogs} />
          </>
  )
}
