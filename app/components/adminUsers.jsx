
'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { deleteUser } from "@/lib/action";
import { useSession } from "next-auth/react";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const { data: session } = useSession();
  const currentUserId = session?.user?.id;

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
    if (id === currentUserId) {
      alert("You cannot delete your own account.");
      return;
    }

    const formData = new FormData();
    formData.append('id', id);
    try {
      const result = await deleteUser(formData);
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
        <div key={user._id} className="mb-4">
          <div className="flex items-center">
            <Image src={user.img || "/coolboy.png"} alt={user.username} width={50} height={50} className="rounded-full" />
            <span className="ml-4">{user.username}</span>
          </div>
          <button
            onClick={() => handleDelete(user._id)}
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

export default AdminUsers;

