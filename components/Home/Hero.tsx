"use client";

import { useRouter } from "next/navigation";

const Hero: React.FC = () => { 
   
   const router = useRouter();
   
   return (   
   
 
<section className="relative w-full h-screen flex items-center justify-center">   
   {/* Background Image */}     
    <div        className="absolute inset-0 bg-cover bg-center"       
     style={{ backgroundImage: "url('/assets/images/image1.png')" }}      >
      </div>     
       {/* Overlay with transparency */}  
           <div className="absolute inset-0 bg-[#0F260D] opacity-80"></div>  
               {/* Content */}   
               <div className="relative z-10 text-white text-center px-6 space-y-6">
        <div className="flex flex-col items-center">
          {" "}
          <h1 className="text-5xl md:text-7xl font-bold max-w-6xl cal_sans ">
            Opportunities Without Barriers
          </h1>
          <p className="text-5xl md:text-7xl font-bold max-w-6xl cal_sans">
            For Startups & Job Seekers.
          </p>
          <p className="text-lg md:mt-2 text-[#BABABA] DM_sans">
            Helping startups find the right talent, and job seekers find the
            right opportunities—fast and hassle-free!
          </p>  
                                 </div>      
                                   
                                 <div className="flex flex-col-reverse md:flex-row items-center md:justify-center gap-3 md:space-x-4 pt-5 cal_sans">
  <button   onClick={() => router.push("/sign_up")}
            className="bg-white text-[#192F1E] w-full md:px-4 py-3 rounded-md cursor-pointer md:w-auto">  
             Post an Opportunity         
              </button>    
 
   <button  onClick={() => router.push("/findjobs")}
            className="bg-green-500 text-white w-full md:px-16 py-3 rounded-md cursor-pointer md:w-auto">
                           Find A Job          
                           </button>   
 
  </div>    
 </div>     
 {/* Plus Sign Image */}    
<img       
 src="assets/images/plussign.png"   
 alt="Plus Sign"      
      className="absolute right-0 top-0 hidden md:block"      />   
 {/* Plus Sign Image for Small screen */}   
 <img        src="assets/images/smallscreenplus.png"    
 alt="Plus Sign"        
     className="absolute -right-2 top-0 md:hidden"      /> 
 </section> 
 );};

export default Hero;