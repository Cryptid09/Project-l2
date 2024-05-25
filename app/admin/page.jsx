'use client'
import { Suspense } from "react";
import AdminPosts from "../components/adminPost";
import AdminPostForm from "../components/adminPostForm";
import AdminUsers from "../components/adminUsers";
import AdminUserForm from "../components/adminUserForm";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const AdminPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

 
  if (status === 'loading') {
    return <div>Loading session...</div>;
  }

  if (!session) {
    router.push('/auth/login'); 
    return null;
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
