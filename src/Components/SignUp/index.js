import { useState } from "react";
import styles from "./styles.module.scss";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/config/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Registro bem-sucedido:", userCredential.user);

      // Adicionar a nova empresa à coleção 'empresas'
      const companyDocRef = await addDoc(collection(db, "empresas"), {
        id: userCredential.user.uid,
        name: companyName,
        paymentDate: new Date(), // Definir a data de pagamento atual como exemplo
      });

      console.log("Empresa adicionada com sucesso:", companyDocRef.id);

      // Redirecionar para a página inicial ou outra página após o registro bem-sucedido
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Criar Conta</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nome da empresa:
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </label>
        <br />
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
        <button type="submit">Criar Conta</button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default SignUp;
