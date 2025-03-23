import React from "react";
import { useRouter } from "next/navigation";

const Hero_5: React.FC = () => {
  const router = useRouter();
  return (
    <section className="bg-[#E1FDE7] px-[5%] md:px-[10%] md:py-20 py-10 pb-40 md:pb-10 relative flex justify-center">
      {/* Background Image */}
      <img
        src="/assets/images/square.png"
        alt=""
        className="w-full max-w-6xl hidden md:block"
      />

      {/* Square Image for Small Screens */}
      <div className="relative">
        <img src="/assets/images/square3.png" alt="" className=" md:hidden w-full"/>
        <img
          src="/assets/images/square2.png"
          alt=""
          className=" absolute -bottom-[22%] right-[7%] md:hidden w-3/4"
        />
      </div>

      {/* Text Overlay */}
      <div className="absolute w-full max-w-6xl flex flex-col items-start md:left-[15%] md:top-[60%]  left-[15%] top-[35%] translate-y-[-40%] text-white">
        <div className="md:text-4xl text-[29px] text-[#ffffff] cal_sans">
          <h2 className="">Take control of your</h2>
          <p>startup journey today.</p>
        </div>
        <p className="text-white mt-4 Epilogue text-[15px] md:text-[16px]">
          Effortlessly connect with top talent or find
        </p>
        <p className="text-white text-[15px] md:text-[16px]">
          the perfect startup opportunity.
        </p>
        <button
          onClick={() => {
            router.push("/sign_up");
            window.scrollTo(0, 0);
          }}
          className="bg-white h-10 px-3 rounded-md mt-4 w-35 md:w-50 DM_sans text-[#192F1E] cursor-pointer">
          Sign up for free
        </button>
      </div>
    </section>
  );
};

export default Hero_5;






// import React from "react";

// const Hero_5: React.FC = () => {
//   return (
//     <>
//       <section className="bg-[#E1FDE7] px-[4%] md:px-[10%] py-20 relative pb-40">
//         <img src="/images/square.png" alt="" className="hidden md:block" />
//         <div className="relative">
//           <img src="/images/square3.png" alt="" className=" md:hidden" />
//           <img
//             src="/images/square2.png"
//             alt=""
//             className=" absolute -bottom-[22%] right-[4%] md:hidden w-75"
//           />
//         </div>
//         <div className="absolute md:left-47 md:bottom-[30%] right-[18%] bottom-[47%]">
//           <div className="md:text-4xl text-[29px] text-[#ffffff] cal_sans">
//             <h2 className="">Take control of your</h2>
//             <p>startup journey today.</p>
//           </div>
//           <p className="text-white mt-4 Epilogue text-[15px] md:text-[16px]">
//             Effortlessly connect with top talent or find
//           </p>
//           <p className="text-white text-[15px] md:text-[16px]">
//             the perfect startup opportunity.
//           </p>
//           <button className="bg-white h-10 px-3 rounded-md mt-4 w-35 md:w-50 DM_sans text-[#192F1E] cursor-pointer">
//             Sign up for free
//           </button>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Hero_5;
