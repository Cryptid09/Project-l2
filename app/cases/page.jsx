'use client'
import React, { useState, useEffect } from 'react';
import CaseSlot from '../components/CaseSlot';

const Cases = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/cases", {next:{revalidate:3600}});
        if (!res.ok) {
          throw new Error('Something went wrong');
        }
        const data = await res.json();
        setPosts(data);
      }
      catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='min-h-screen flex flex-wrap gap-9 bg-[#393936] p-16'>
      {posts.map((post) => (

        <div key={post.id}>
          <CaseSlot post={post} />
        </div>
      ))}
    </div>
  );
};

export default Cases;
