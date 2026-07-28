import React from 'react'
import OfficeRelocation from './clientOffice'
import { generateSEOMetadata } from '../../../../lib/seometadata';
import RelatedBlogs from '@/components/related-blogs';
import { getPageBlogs } from '../../../../lib/blogs';



export const dynamic = 'force-dynamic';
export const generateMetadata = generateSEOMetadata;
export default async function page() {
  const blogs = await getPageBlogs('office-relocation');
  return (
    <>
 <OfficeRelocation/>
 <RelatedBlogs blogs={blogs} />
        </>
  )
}
