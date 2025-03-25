import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Hero5: React.FC = () => {
  const router = useRouter();
  return (
    <>
    <section className="bg-[#E1FDE7] px-[4%] md:px-[10%] py-20 relative md:pb-30 pb-40">
      <Image
        src="/assets/images/square.png"
        alt="Square"
        width={1192} // Adjust as needed
        height={414} // Adjust as needed
        className="hidden md:block"
      />
      <div className="relative">
        <Image
          src="/assets/images/square3.png"
          alt=""
          width={397}
          height={486}
          className=" md:hidden"
        />
        <Image
          src="/assets/images/square2.png"
          alt=""
          width={322}
          height={220}
          className=" absolute -bottom-[22%] right-[4%] md:hidden w-75"
        />
      </div>
      <div className="absolute md:left-48 md:bottom-[35%] right-[18%] bottom-[45%]">
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
          onClick={() => router.push("/sign_up")}
          className="bg-white h-10 px-3 rounded-md mt-4 w-40 md:px-15 DM_sans text-[#192F1E] cursor-pointer"
        >
          Sign up 
        </button>
      </div>
    </section>
  </>
  );
};

export default Hero5;
