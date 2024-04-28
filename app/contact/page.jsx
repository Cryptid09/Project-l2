import React from 'react'

const contact = () => {
  return (<>
     <div className='text-center bg-[#d4d4d0] pt-20 '>
      <div className='font-mono '>
      <h1 className= 'text-3xl font-bold pl-24 '><b className='bg-[#f0ec25] px-3 hover:shadow-md  hover:shadow-slate-700 rounded-s-full hover:rounded-full hover:px-7'>Fill</b></h1>
      <h1 className='font-mono  text-xl'>the form below </h1>
      <h1>to reach <b className='px-2 bg-[#f0ec25] hover:text-2xl hover:rounded-md'>Me</b></h1>
      </div>
    <div className='p-2 text-center  grid grid-cols-1 gap-5'> 
    <div><input type='text' placeholder='Name' className='bg bg-black text-white p-2'/></div>
    <div><input type='text' placeholder='E-mail' className='bg-black text-white p-2'/></div>
    <div><input type='text' placeholder='Contact No.' className='bg-black text-white p-2'/></div>
    <div><textarea placeholder="Enter message" className='bg bg-black text-white p-2'/></div>
    <div className='font-mono'><button className='px-2 transition ease-in-out delay-150 bg-[#f0ec25] hover:-translate-y-1 hover:scale-110 hover:bg-[#f3d00b] rounded shadow hover:shadow-xl duration-300'>Submit</button></div>
     </div>

     <div className='font-mono font-bold text-xl'>I will try to reach you as soon as possible if your credentials are correct</div>
  </div>
  </>
  )
}

export default contact