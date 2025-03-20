import React, { useState } from "react";
import SigninModal from "@/components/auth/SigninModal";

const Signin = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="h-screen flex justify-center items-center bg-gray-300">
      <SigninModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default Signin;
