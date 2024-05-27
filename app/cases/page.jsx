'use client';
import React, { useState, useEffect } from 'react';
import CaseSlot from '../components/CaseSlot';
import Loading from '../loading';

const Cases = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/cases", { next: { revalidate: 3600 } });
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

  if (error) return <div>Error: {error}</div>;
  if (!posts.length) return <Loading />;

  return (
    <div className='min-h-screen flex flex-wrap gap-9 bg-[#393936] p-16'>
      {posts.map((post) => (
        <CaseSlot key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Cases;
