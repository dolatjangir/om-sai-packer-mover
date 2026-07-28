import React from 'react'
import MovingChecklistPage from './clientChecklist'
import RelatedBlogs from '@/components/related-blogs'
import { getPageBlogs } from '../../../../lib/blogs';
import { generateSEOMetadata } from '../../../../lib/seometadata';

export const dynamic = 'force-dynamic';
export const generateMetadata = generateSEOMetadata;
export default async function page() {
     const blogs = await getPageBlogs('moving-checklist');
  return (
       <>
    <MovingChecklistPage/>
      <RelatedBlogs blogs={blogs} />
           </>
  )
}
