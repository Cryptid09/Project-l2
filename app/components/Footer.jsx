'use client';
import React, { useState } from 'react';
import { ArrowDropDown,ArrowDropUp, Instagram,X,LinkedIn,GitHub} from '@mui/icons-material';

import Link from 'next/link'

const Footer = () => {
    const [Drp, setDrp] = useState(true);
    const apr = () => { setDrp(!Drp); };
    return (
    <footer className="bg-black">
    <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
    <div className="md:flex md:justify-between">
      
        <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3 place-content-center w-screen">
            <div>
                <h2 className="mb-6 text-sm font-semibold  uppercase text-white">Contact</h2>
                <ul className=" text-gray-400 font-medium">
                    <li className="mb-4">
                        +91123456789
                    </li>
                    <li> 
                        VipinParmar279@gmail.com
                    </li>
                    
                </ul>
            </div>
            <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow Me</h2>
                <ul className="text-gray-400 font-medium">
                    <li className="mb-4">
                        <Link href="https://x.com" className="hover:underline gap-2"><X/>Twitter</Link>
                    </li>
                    <li>
                        <Link href="https://Instagram.com" className="hover:underline flex gap-1"><Instagram/>Instagram</Link>
                    </li>
                </ul>
            </div>
            <div>
                <h2 className="mb-6 text-sm font-semibold  uppercase dark:text-white"><div className='flex' onClick={apr} >Address<ArrowDropDown className={`${Drp ? 'block' : 'hidden'}`}  /><ArrowDropUp className={`${Drp ? 'hidden' : 'block'}`}  />
                </div><span className={`${Drp ? 'hidden' : 'block'} text-white dark:text-gray-400 font-medium`}>Office no 715, 7<sup>th</sup>floor Fortune Ambience-space, South Tukoganj near Surya hotel Indore (MP)</span>
                            </h2>
                
            </div>
        </div>
    </div>
    <hr className="my-6  sm:mx-auto border-gray-700 lg:my-8" />
    <div className="sm:flex sm:items-center sm:justify-between">
        <span className="text-sm  sm:text-center text-gray-400">Made by <Link href='https://www.instagram.com/encrypted__aks/' className='hover:underline'>Cryptid</Link>
        </span>
        <div className="flex mt-4 sm:justify-center sm:mt-0">
          <Link href="#" className="text-gray-500 hover:text-white">
              <Instagram/>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-white ms-5">
              <LinkedIn/>
            </Link>
            
            <Link href="#" className="text-gray-500 hover:text-white ms-5">
           <GitHub/>
            </Link>
         
      </div>
    </div>
</div>
</footer>
)}

export default Footer
