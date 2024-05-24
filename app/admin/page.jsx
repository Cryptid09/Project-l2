'use client'
import { Suspense, useEffect, useState } from "react";
import AdminPosts from "../components/adminPost";
import AdminPostForm from "../components/adminPostForm";
import AdminUsers from "../components/adminUsers";
import AdminUserForm from "../components/adminUserForm";
import {auth} from "@/lib/auth";

const AdminPage = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const result = await auth();
      if (result?.user) {
        setSession(result);
      }
    };

    fetchSession();
  }, []);

  if (!session) {
    return <div>Loading session...</div>;
  }

  return (
    <div className="min-h-screen">
      <div>
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <AdminPosts />
          </Suspense>
        </div>
        <div>
          <AdminPostForm userId={session.user.id} />
        </div>
      </div>
      <div>
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <AdminUsers />
          </Suspense>
        </div>
        <div>
          <AdminUserForm />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
