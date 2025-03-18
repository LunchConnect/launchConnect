import React from 'react'
import { useRouter } from 'next/navigation'

export const Header: React.FC = () => {
  const router = useRouter()
  return (
    <>
      <header className=" sticky top-0 z-50 flex justify-between px-[10%] py-[1%] bg-white">
        <div
          onClick={() => router.push("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src="assets/images/logo.png" alt="Logo" className="" />
          <div className="flex flex-col text-[17px] font-semibold">
            <h2 className="text-[#5D7061]">Launch</h2>
            <span className="-mt-2 text-[#5D7061]">Connect</span>
          </div>
        </div>

        <div className="flex items-center gap-5 text-[#192F1E] ">
          <button className="cursor-pointer">How it works</button>
          <button className="cursor-pointer">Find Jobs</button>
        </div>

        <div className="gap-4 flex items-center">
          <button   onClick={() => router.push("/sign_in")} className="text-[#192F1E] cursor-pointer">Login</button>
          <button  onClick={() => router.push("/sign_up")} className="bg-green-500 px-8 h-12 rounded-xl text-white cursor-pointer hover:bg-green-600">
  Sign Up
</button>
        </div>
      </header>
    </>
  );
}


