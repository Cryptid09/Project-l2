'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { deleteUser } from "@/lib/action";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/admin/users');
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to fetch users');
        setUsers(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const formData = new FormData();
    formData.append('id', id);
    try {
      const result = await deleteUser(null, formData);
      if (result.error) throw new Error(result.error);
      setUsers(users.filter(user => user._id !== id));
    } catch (err) {
      console.error("Failed to delete user:", err);
      alert("Error deleting user");
    }
  };

  if (error) return <div>Error: {error}</div>;
  if (!users.length) return <div>Loading...</div>;

  return (
    <div>
      <h1>Users</h1>
      {users.map((user) => (
        <div key={user._id}>
          <div>
            <Image src={user.img || "/coolboy.png"} alt={user.username} width={50} height={50} />
            <span>{user.username}</span>
          </div>
          <button onClick={() => handleDelete(user._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AdminUsers;
