import React from 'react'
import { generateSEOMetadata } from '../../lib/seometadata';
import RelatedBlogs from '@/components/related-blogs';
import { prisma } from '../../lib/prisma';
import { getPageBlogs } from '../../lib/blogs';
import HomePage from '@/components/homePage/home';



export const generateMetadata = generateSEOMetadata;
export default async function page() {
 const blogs = await getPageBlogs('Home');

  return (
<> 
 <HomePage/>
   <RelatedBlogs blogs={blogs} />
</>

)
}
