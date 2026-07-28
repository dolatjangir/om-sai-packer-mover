import React from 'react'

import { getPageBlogs } from '../../../../lib/blogs';
import { generateSEOMetadata } from '../../../../lib/seometadata';
import RelatedBlogs from '@/components/related-blogs';
import Gallery from './clientGallery';


export const dynamic = 'force-dynamic';
export const generateMetadata = generateSEOMetadata;
export default async function page() {
   const blogs = await getPageBlogs('gallery');
  return (
    <>
    <Gallery/>
      <RelatedBlogs blogs={blogs} />
                      </>
  )
}
