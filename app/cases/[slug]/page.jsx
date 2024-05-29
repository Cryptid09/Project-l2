'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const SinglePost = ({ params }) => {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/cases/${params.slug}`);
        if (!res.ok) {
          throw new Error('This post could not be loaded at the moment. Please try again later.');
        }
        const data = await res.json();
        setPost(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className='flex flex-col-reverse md:flex-row gap-7 bg-[#d4d4d0]'>
      <div className='place-content-end md:relative md:content-start'>
        <Image src={post.img} alt={post.title} width={500} height={500} />
      </div>
      <div>
        <h1 className='mb-2 text-3xl text-center text-black'>{post.title}</h1>
        <div className='flex gap-7 items-center'>
          <Image src='/coolboy.png' alt='Author' width={50} height={50} className='rounded-full' />
          <div>
            <div>Author</div>
            <span className='text-xs'>{post.author}</span>
          </div>
          <div>
            <div>Published</div>
            <span className='text-xs'>{post.date}</span>
          </div>
        </div>
        <div className='mt-7'>
          {post.desc}
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
``

