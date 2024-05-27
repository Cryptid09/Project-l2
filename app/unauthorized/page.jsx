'use client';
import React from 'react';

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Unauthorized</h1>
      <p className="text-xl">You do not have access to this page.</p>
    </div>
  );
}
