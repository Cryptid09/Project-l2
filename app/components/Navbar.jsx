'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useSession, signOut } from 'next-auth/react';
import { Providers } from '../providers';

const Navbar = () => {
  const [vsb, setvsb] = useState(true);
  const appear = () => {setvsb(!vsb); };
  const pathName = usePathname();
  const {data: session } = useSession();

  return (

    <nav className='text-white font-bold absolute z-50 py-1 flex justify-between w-screen pr-9'>
    <div className='pl-2 pt-0'>Logo</div>

    <ul className='md:right-auto right-1 md:relative absolute md:h-12 md:bg-inherit bg-[#09093522]'>
      <li className='hover:bg-[#07061399] md:hidden '>
        <MenuIcon className={`${vsb ? 'block' : 'hidden'}`} onClick={appear} />
        <CloseIcon className={`${vsb ? 'hidden' : 'block'}`} onClick={appear} />
      </li>

      <li className={`h-100vh md:sticky md:block top-10 relative ${vsb ? 'hidden' : 'block'}`}>
        <ul className='place-items-center gap-7 md:flex md:border-none md:divide-y-0 divide-y'>
          <li className={`py-1 px-2  ${pathName === '/' && 'border-b-2 border-amber-400'}`}>
            <Link href="/">Home</Link>
          </li>
          <li className={`py-1  px-2 ${pathName === '/contact' && ' border-b-2 border-amber-400'}`}>
            <Link href="/contact">Contact Me</Link>
          </li>
          <li className={`py-1  px-2 ${pathName === '/cases' && 'border-b-2 border-amber-400'}`}>
            <Link href="/cases">Cases</Link>
          </li>

          {session?.user ? (
            <>
              {session.user.isAdmin && (
                <li className={`py-1  px-2 ${pathName === '/admin' && 'border-b-2 border-amber-400'}`}>
                  <Link href="/admin">Admin</Link>
                </li>
              )}
              <li className='py-2'>
                <button
                  onClick={() => signOut()}
                  className="relative items center justify-start inline-block px-2 py-1 overflow-hidden font-bold rounded-full group"
                >
                  <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
                  <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
                  <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">Logout</span>
                  <span className="absolute inset-0 border-2 border-white rounded-full"></span>
                </button>
              </li>
            </>
          ) : (
            <li className={`pt-2 ${pathName === '/login'}`}>
              <Link href="/login" className="relative items-center justify-start inline-block px-2 py-1 overflow-hidden font-bold rounded-full group">
                <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
                <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
                <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-black">Login</span>
                <span className="absolute inset-0 border-2 border-white rounded-full"></span>
              </Link>
            </li>
          )}
        </ul>
      </li>
    </ul>
  </nav>

  );
};

export default Navbar;
