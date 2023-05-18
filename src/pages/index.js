import { useState } from "react";
import SignIn from "@/Components/SigIn";
import SignUp from "@/Components/SignUp";

export default function Home() {
  const [showSignUp, setShowSignUp] = useState(false);

  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };

  return (
    <div>
      {showSignUp ? <SignUp /> : <SignIn />}
      <button onClick={toggleSignUp}>
        {showSignUp ? "Já possui conta? Faça Login" : "Criar Conta"}
      </button>
    </div>
  );
}
