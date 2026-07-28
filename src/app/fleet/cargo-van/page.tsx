import React from 'react'
import CargoVanPage from './clientVan'
import { generateSEOMetadata } from '../../../../lib/seometadata';
import { getPageBlogs } from '../../../../lib/blogs';
import RelatedBlogs from '@/components/related-blogs';


export const dynamic = 'force-dynamic';
export const generateMetadata = generateSEOMetadata;
export default async function page() {
   const blogs = await getPageBlogs('cargo-van');
  return (
    <>
    <CargoVanPage/>
      <RelatedBlogs blogs={blogs} />
                      </>
  )
}
