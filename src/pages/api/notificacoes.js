import { admin } from "@/config/firebaseAdmin";
import { pegarTokensEmpresa } from "@/Servicos/pegarTokensEmpresa";

export default async function handler(req, res) {
  const { title, body, id} = req.body;

  const tokens = await pegarTokensEmpresa(id);
  const url = req.body.url || ""; 
  const image = req.body.url || ""; 

  const message = {
    notification: {
      title: title,
      body: body
    },
    android: {
      notification: {
        imageUrl: image
      }
    },  
     data: {
      data: url
    },
    tokens: tokens,
  };

  try {
    const response = await admin.messaging().sendMulticast(message);
    console.log("Notificação enviada com sucesso!");
    console.log("Tokens entregues:", response.successCount);
    console.log("Tokens com erro:", response.failureCount);
    res.status(200).json({
      status: "Notificação enviada com sucesso!",
      successCount: response.successCount
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Erro ao enviar",
    });
  }
}
