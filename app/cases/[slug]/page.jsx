'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const SinglePost = ({ params }) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
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
        <Image src="/Ci.png" width={500} height={500} />
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
         {post.body}
        </div>
      </div>
    </div>
  )
}
export default SinglePost 