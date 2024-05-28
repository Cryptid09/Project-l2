import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const CaseSlot = ({ post }) => {
  return (
    <div>
      {/* Top */}
      <div className='flex place-items-center '>
        <div className='w-40 flex-wrap '>
          <Image src="/Lawyer.png" alt="Lawyer" width={200} height={200} />
        </div>
        <div className='h-2 w-15 rotate-90 text-xs'>
          {new Date(post.createdAt).toLocaleDateString()}
        </div>
      </div>

      {/* Bottom */}
      <div className='w-40 truncate'>
        <h1>{post.title}</h1>
        <p className='text-xs text-gray-500'>{post.desc}</p>
        <Link href={`/cases/${post.slug}`} className='hover:underline'>
          Read More
        </Link>
      </div>
    </div>
  )
}

export default CaseSlot
