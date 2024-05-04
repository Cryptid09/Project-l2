'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import PostUser from '@/app/components/postU';
import { Suspense } from "react";
import { getPost } from "@/lib/data";


  const post = await getPost(slug);


const SinglePost = ({ params }) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/cases/${slug}');
        if (!res.ok) {
          throw new Error('Something went wrong');
        }
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  
  const post = posts.find(p => p.id === parseInt(params.slug));;

  if (!post) {
    return <div>Post not found</div>;
  }
  return (
    <div className='flex flex-col-reverse md:flex-row gap-7 bg-[#d4d4d0]'>
      <div className='place-content-end md:relative md:content-start'>
        <Image src={post.img} width={500} height={500} />
      </div>
      <div>
        <h1 className='mb-2 text-3xl text-center text-black'></h1>
        <div className='flex gap-7 items-center'>
          <Image src='/coolboy.png' width={50} height={50} className='rounded-full' />

          <div>
            <div>Author</div>
            <span className='text-xs'>Akshat</span>
          </div>

          <div >
            <div>Phublished</div>
            <span className='text-xs'>01.01.2024</span>
          </div>
        </div>
        <div className='mt-7'>
         {post.desc}
        </div>
      </div>
    </div>
  )
}
export default SinglePost 