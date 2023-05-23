import { useState } from "react";
import SignIn from "@/Components/SigIn";
import SignUp from "@/Components/SignUp";

export default function Home() {
  const [showSignUp, setShowSignUp] = useState(false);

  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };

  return (
    <>
     <SignIn />
    </>
  );
}
