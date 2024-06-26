'use client';
import React from 'react';
import WebAssetOffIcon from '@mui/icons-material/WebAssetOff';

const NotFound = () => {
  return (
    <div className='flex place-content-center text-xl gap-2'>
      <WebAssetOffIcon className='text-2xl'/>
      <div>Page not found</div>
    </div>
  );
}

export default NotFound;
