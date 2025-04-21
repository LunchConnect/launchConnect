// hooks/useProtectRoute.ts
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useProtectRoute = (): void => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/sign_in");
    }
  }, []);
};

export default useProtectRoute;
