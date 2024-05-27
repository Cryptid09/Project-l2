
'use client';
import React, { Suspense, useEffect } from "react";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; 
import AdminPosts from "../components/adminPost";
import AdminPostForm from "../components/adminPostForm";
import AdminUsers from "../components/adminUsers";
import AdminUserForm from "../components/adminUserForm";
import Loading from "../loading";

const AdminPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && !session?.user?.isAdmin) {
      router.push('/');
    }
  }, [session, status, router]);

  if (status === 'loading') return <Loading />;
  if (!session) {
    router.push('/auth/login');
    return null;
  }
  if (!session.user.isAdmin) return null;

  return (
    <div className="min-h-screen bg-[#393936] py-8 grid place-items-center">
      <div>
        <Suspense fallback={<Loading />}>
          <AdminPosts />
        </Suspense>
        <AdminPostForm userId={session.user.id} />
      </div>
      <div>  
        <Suspense fallback={<Loading />}>
          <AdminUsers />
        </Suspense>
        <AdminUserForm />
      </div>
    </div>
  );
};

export default AdminPage;
