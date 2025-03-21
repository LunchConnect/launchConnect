import React from "react";

const Hero5: React.FC = () => {
  return (
    <>
      <section className="bg-[#E1FDE7] px-[10%] py-20 relative">
        <img src="assets/images/square.png" alt="" className="" />
        <div className="absolute left-47 bottom-[30%]">
          <div className="text-4xl font-semibold text-[#ffffff]">
            <h2 className="">Take control of your</h2>
            <p>startup journey today.</p>
          </div>
          <p className="text-white mt-4">
            Effortlessly connect with top talent or find
          </p>
          <p className="text-white ">the perfect startup opportunity.</p>
          <button className="bg-white h-10 px-3 rounded-md mt-4 w-50 text-[#192F1E] cursor-pointer">
            Sign up for free
          </button>
        </div>
      </section>
    </>
  );
};

export default Hero5;
