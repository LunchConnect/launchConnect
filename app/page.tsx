"use client"
import SuccessModal from "@/components/SuccessModal";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ErrorModal from "@/components/ErrorModal";
import LoginSuccessModal from "@/components/LoginSuccessModal";
import LandingPage from "@/components/Home/LandingPage";
const Home = () => {
  // const [modalOpen, setModalOpen] = useState(false);
  // const [showError, setShowError] = useState(false);
  // const [showSuccess, setShowSuccess] = useState(false);
  return (
    <div className="flex h-screen max-h-screen">
<LandingPage/>
    </div>
  );
};

export default Home;
