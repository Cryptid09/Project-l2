
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
          <button onClick={() => handleDelete(post._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AdminPosts;
