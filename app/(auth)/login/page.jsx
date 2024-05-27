'use client';
import React, { useState, useEffect } from 'react';
import LoginForm from '@/app/components/loginForm';
import Loading from '@/app/loading';

export default function LoginPage() {
  const [csrfToken, setCsrfToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch('/api/auth/csrf-token');
        const data = await response.json();
        setCsrfToken(data.csrfToken);
      } catch (error) {
        setError('Failed to fetch CSRF token');
      } finally {
        setLoading(false);
      }
    };
    fetchCsrfToken();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen flex flex-wrap gap-9 bg-[#393636] p-16">
      <LoginForm csrfToken={csrfToken} />
    </div>
  );
}
