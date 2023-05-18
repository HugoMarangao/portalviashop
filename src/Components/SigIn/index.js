import { useState } from "react";
import styles from "./styles.module.scss";
import { useRouter } from "next/router"; // Importe o useRouter
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter(); // Instancie o useRouter

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Login bem-sucedido:", userCredential.user);

      // Redirecionar para a página Dashboard após o login bem-sucedido
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          E-mail:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Entrar</button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default SignIn;
