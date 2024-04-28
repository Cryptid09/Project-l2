import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const CaseSlot =  ({post}) => {
  return (
    <div>
      {/* Top */}
      
      <div className='flex place-items-center '>
        <div className='w-40 flex-wrap '>
          <Image src="/Lawyer.png" width={200} height={200}/>
        </div>
        <div className='h-2 w-15 rotate-90 text-xs'>
          01.03.2024
        </div>
      </div>
      
      {/* bottom */}
      <div className='w-40 truncate'>
        <h1 >{post.title}</h1>
        <p className='text-xs text-gray-500'>{post.body}</p>
        <Link href={`/cases/${post.id}`} className='hover:underline'>Read More   </Link>
      </div>
    </div>
  )
}

export default CaseSlot 