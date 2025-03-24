import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      <div className="flex flex-col items-center">
        <Image
          src="/assets/images/logo.png"
          alt="loader"
          width={40}
          height={40}
          className="animate-spin"
        />
        <p className="mt-2 text-lg text-white">Loading...</p>
      </div>
    </div>
  );
}
