import { admin } from "@/config/firebaseAdmin";
// import { pegarTokens } from "@/Servicos/firestore";
import { pegarTokensEmpresa } from "@/Servicos/pegarTokensEmpresa";

export default async function handler(req, res) {
  // This registration token comes from the client FCM SDKs.
  const { title, body, id } = req.body;

  const tokens = await pegarTokensEmpresa(id);

  const message = {
    notification: {
      title: title,
      body: body
    },
    tokens: tokens,
  };

  // Send a message to the device corresponding to the provided
  // registration token.
  try {
    await admin?.messaging()?.sendEachForMulticast(message);
    console.log("Notificacao enviada com sucesso!");
    res.status(200).json({
      status: "Notificacao enviada com sucesso!",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Erro ao enviar",
    });
  }
}
