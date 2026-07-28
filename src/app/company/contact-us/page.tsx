import React from 'react'

import { getPageBlogs } from '../../../../lib/blogs';
import { generateSEOMetadata } from '../../../../lib/seometadata';
import RelatedBlogs from '@/components/related-blogs';

import ContactUs from './contactClient';


export const dynamic = 'force-dynamic';
export const generateMetadata = generateSEOMetadata;
export default async function page() {
   const blogs = await getPageBlogs('contact-us');
  return (
    <>
    <ContactUs/>
      <RelatedBlogs blogs={blogs} />
                      </>
  )
}
