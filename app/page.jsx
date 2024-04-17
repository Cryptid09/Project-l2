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
    </>
  );
} 
