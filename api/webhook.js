import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  // Configuración de CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(200).json({ message: "Webhook activo y funcionando" });
  }

  try {
    console.log("BODY RECIBIDO:", JSON.stringify(req.body));
    
    // Responder inmediatamente con éxito a Mercado Pago para evitar el corte por timeout o error 500
    return res.status(200).json({ received: true });

  } catch (error) {
    console.error("ERROR CRITICO EN WEBHOOK:", error.message);
    return res.status(200).json({ received: true, error: error.message });
  }
}