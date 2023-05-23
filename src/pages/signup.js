import { useState } from "react";
import SignUp from "@/Components/SignUp";

export default function signup() {
  const [showSignUp, setShowSignUp] = useState(false);

  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };

  return (
    <>
      <SignUp/>
    </>
  );
}
