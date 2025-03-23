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
                  <div className="relative z-10 text-white text-center md:px-6 px-3 md:space-y-4">   
                         <div className="text-[49px] md:text-7xl font-bold md:max-w-6xl cal_sans md:space-y-3">         
                           <h1>Opportunities Without Barriers</h1>       
                              <p>For Startups & Job Seekers.</p>     
                                 </div>      
                                   <p className="text-lg mt-2 text-[#BABABA] DM_sans">    
                                          Join a network where founders find talent, and job seekers land their          dream roles.        </p>  
                                                <div className="md:space-x-4 pt-5 flex flex-col-reverse md:flex-row justify-center gap-4 md:gap-0 px-2 md:px-0 ">       
                                                     <button onClick={() => router.push("/sign_up")} className="bg-white text-[#192F1E] custom-btn rounded-md cursor-pointer cal_sans">            Post an Opportunity          </button>    
                                                           <button  onClick={() => router.push("/findjobs")} className="primary text-[#F1F1F1] custom-btn rounded-md md:w-40 cursor-pointer cal_sans">            Find A Job          </button>   
                                                                </div>    
                                                                  </div>     
                                                                   {/* Plus Sign Image */}    
                                                                     <img        src="assets/images/plussign.png"        alt=""        className="absolute right-0 top-0 hidden md:block"      />   
                                                                        {/* Plus Sign Image for Small screen */}   
                                                                           <img        src="assets/images/smallscreenplus.png"        alt=""        className="absolute -right-2 top-0 md:hidden"      /> 
                                                                              </section> 
                                                                               );};

export default Hero;
