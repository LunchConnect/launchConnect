import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Hero5: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <section className="bg-[#E1FDE7] px-[4%] md:px-[10%] py-14 relative md:pb-10 pb-[90px]">
        <div className="relative hidden md:block">
          <Image
            src="/assets/images/rectangle1.png"
            alt="Square"
            width={1192} 
            height={414} 
          />
          <Image
            src="/assets/images/rectangle2.png"
            alt="Square"
            width={520.01}
            height={221} 
            className="absolute top-[24.8%] right-[4%]"
          />
          <div className="absolute md:left-20 md:bottom-[20%]">
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
        </div>

        {/* Mobile View */}
        <div className="relative md:hidden">
          <Image
            src="/assets/images/square3.png"
            alt=""
            width={397}
            height={486}
          />
          <Image
            src="/assets/images/rectangle2.png"
            alt=""
            width={369}
            height={185.87}
            className=" absolute -bottom-[10%] right-0 w-[85%]"
          />
          <div className="absolute right-[18%] bottom-[35%]">
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
        </div>
      </section>
    </>
  );
};

export default Hero5;
