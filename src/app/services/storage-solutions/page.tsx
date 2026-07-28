import React from 'react'
import StorageSolutions from './clientStorage'
import { getPageBlogs } from '../../../../lib/blogs';
import { generateSEOMetadata } from '../../../../lib/seometadata';
import RelatedBlogs from '@/components/related-blogs';



export const dynamic = 'force-dynamic';
export const generateMetadata = generateSEOMetadata;
export default async function page() {
   const blogs = await getPageBlogs('storage-solutions');
  return (
    <>
    <StorageSolutions/>
    <RelatedBlogs blogs={blogs} />
           </>
  )
}
