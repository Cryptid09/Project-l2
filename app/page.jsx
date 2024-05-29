'use client';
import Image from "next/image";
import React from 'react';

const Home = () => {
  return ( <>
    <div className="w-screen flex overflow-hidden bg-[#393636] justify-between relative">
    <div className="relative w-[400px] h-[900px]">
      <Image
        fill
        className="object-cover"
        src="/Bg1.png"
        alt="Background Image"
        sizes="400px"
        priority
      />
    </div>
  
      <div className="text-white absolute z-10 pl-96 pt-80 text-xl font-bold">
        <div className="text-4xl">My name is</div>
        <div className="text-6xl">Vipin Parmar</div>
        <div className="py-1 text-2xl text-center bg-[#f0ec25] text-[#29292b]">
          I'm an Advocate
        </div>
      </div>
      <div className="relative w-[700px] h-[900px]">
      <Image
        src="/Ci.png"
        fill
        className="object-cover"
        alt="CI Image"
        sizes="700px"
      />
    </div>
    </div>
    <div className="bg-[#d4d4d0] w-screen flex gap-28 pt-20 pl-10">
      <div>
       <div className="relative w-[400px] h-[400px]">
      <Image
        src="/c2.jpeg"
        fill
        className="object-cover"
        alt="Image"
        sizes="400px"
      />
    </div>
    <div className="relative w-[200px] h-[100px] mt-4">
      <Image
        src="/D2.png"
        fill
        className="object-cover"
        alt="Image"
        sizes="200px"
      />
    </div>
      </div>
      <div className="font-mono">
        <div className="flex gap-20">
          <div>
            <div className="text-right bg-[#f0ec25] text-5xl font-bold">Who</div>
            <div className="text-2xl font-bold">am I exactly?</div>
          </div>
            <div className="relative w-[300px] h-[100px]">
      <Image
        src="/d1.png"
        fill
        className="object-cover"
        alt="design"
        sizes="300px"
      />
    </div>
        </div>
        <div className="pr-10 pt-10">
          A dedicated advocate committed to fostering positive change.
          <br />
          With a steadfast focus on justice and equality, I try to bring
          <br />
          a pragmatic approach to addressing societal issues. Through my
          <br />
          expertise, empathy, and tireless efforts, I work to dismantle
          <br />
          barriers and empower individuals.
        </div>
      </div>
    </div>
  </>
   
  )
}

export default Home


