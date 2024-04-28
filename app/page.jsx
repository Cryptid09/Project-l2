import Image from "next/image";

export default function Home() {
  return (<>       
    <div className="w-screen flex overflow-clip  bg-[#393636] justify-between">
      <div style={{ position: "relative", width: `${400}px`, height: `${900}px` }} >
        <Image
        fill
        style={{ objectFit: "fill" }}
        src='/Bg1.png'
        alt="bg image" />
      </div>
      <div className="text-white absolute z-10 pl-96 pt-80 text-xl font-bold">
       <div className="text-4xl">My name is</div>
       <div className="text-6xl">Vipin Parmar</div>
       <div className="py-1 text-2xl text-center bg-[#f0ec25] text-[#29292b]">I'm an Advocate</div>
      </div>
      <div style={{ position: "relative", width: `${700}px`, height: `${900}px` }}>
        <Image  
        fill
        style={{ objectFit: "fill" }} 
        src='/Ci.png'  
        alt="ci image"/>      
      </div>
    </div>


    <div className="bg-[#d4d4d0] w-screen flex gap-28 pt-20 pl-10">
      <div><div style={{ position: "relative", width: `${400}px`, height: `${400}px` }}>
        <Image  src='/c2.jpeg' fill style={{ objectFit: "fill" }} alt="Image"/>
      </div>
      <div style={{ position: "relative", width: `${200}px`, height: `${100}px` }}><Image src='/D2.png' fill style={{ objectFit: "fill" }} alt="Image" /></div>
      </div>
      
      
{/* right side of page */}

      <div className="font-mono">

        <div className="flex gap-20">
        <div> 
          <div className=" text-right bg-[#f0ec25] text-5xl font-bold ">Who</div>
          <div className="text-2xl font-bold">am I exactly?</div>
        </div>
        
        <div   style={{ position: "relative", width: `${300}px`, height: `${100}px` }}> 
          <Image fill style={{ objectFit: "fill" }} src="/d1.png"  alt="design"/>
        </div>
        
        </div>
        <div className="pr-10 pt-10">
           A dedicated advocate committed to fostering positive change.<br/>
           With a steadfast focus on justice and equality, I try to brings<br/>
           a pragmatic approach to addressing societal issues. Through my<br/>
           expertise, empathy, and tireless efforts, I work to dismantle<br/>
           barriers and empower individuals.
        </div>
 
      </div>
      </div>
    </>
  );} 
