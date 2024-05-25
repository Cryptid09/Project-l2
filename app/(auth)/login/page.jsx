'use client'
import React, { useState, useEffect } from 'react';
import LoginForm from '@/app/components/loginForm';

export default function LoginPage() {
  const [csrfToken, setCsrfToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch('api/auth/csrf-token');
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

  return (
    <div className='min-h-screen flex flex-wrap gap-9 bg-[#d4d4d0] p-16'>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <LoginForm csrfToken={csrfToken} />
      )}
    </div>
  );
}
