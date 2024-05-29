
'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/admin/posts');
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to fetch posts');
        setPosts(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    const formData = new FormData();
    formData.append('id', id);
    try {
      const response = await fetch('/api/admin/posts', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed to delete post');
      setPosts(posts.filter(post => post._id !== id));
    } catch (err) {
      console.error('Failed to delete post:', err);
      alert('Error deleting post');
    }
  };

  if (error) return <div>Error: {error}</div>;
  if (!posts.length) return <div>Loading...</div>;

  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div key={post._id}>
          <div>
            <Image
              src={post.img || '/coolboy.png'}
              alt={post.title}
              width={50}
              height={50}
            />
            <span>{post.title}</span>
          </div>
           <button
            onClick={() => handleDelete(post._id)}
            className="relative inline-flex items-center justify-start px-3 py-2 mt-2 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group"
          >
            <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
              <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
            </span>
            <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
            <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
              Delete
            </span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminPosts;