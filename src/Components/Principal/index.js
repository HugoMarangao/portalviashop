import { useState } from "react";
import { enviarnotificacao } from "@/Servicos/notificacoes";
import styles from "./styles.module.scss";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/config/firebase";

const Principal = () => {
  const [titulo, setTitulo] = useState("");
  const [id, setId] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      // Enviar a notificação
      await enviarnotificacao(titulo, mensagem, id);

      // Salvar a notificação no Firestore
      const notificacoesRef = collection(
        db,
        "notificacoes",
        "viashop",
        "notificacoes"
      );
      await addDoc(notificacoesRef, {
        titulo,
        mensagem,
        id,
      });

      setMessageSent(true);
      setTitulo("");
      setMensagem("");
      setId("");
    } catch (error) {
      console.error("Erro ao enviar a notificação:", error);
    }
  };

  return (
    <div className={styles.Principal}>
      <h1>Principal</h1>
      <form onSubmit={onSubmit} className={styles.for2}>
        <div className={styles.form2}>
          <label htmlFor="titulo">Título:</label>
          <input
            id="titulo"
            name="titulo"
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>
        <div className={styles.form2}>
          <label htmlFor="mensagem">Mensagem:</label>
          <input
            id="mensagem"
            name="mensagem"
            type="text"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
          />
        </div>
        <div className={styles.form2}>
          <label htmlFor="Id">Id:</label>
          <input
            id="Id"
            name="Id"
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <button type="submit" disabled={id === " " || id.length < 6}>
          Enviar
        </button>
      </form>
      {messageSent && <p>Notificação enviada e salva com sucesso!</p>}
      <div>
        <h1>list</h1>
      </div>
    </div>
  );
};

export default Principal;
