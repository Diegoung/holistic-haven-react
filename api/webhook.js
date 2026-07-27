import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
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
    
    const notification = req.body;

    // Ignorar pruebas genéricas
    if (notification?.data?.id === "123456" || notification?.id === "123456") {
      return res.status(200).json({ received: true, test: true });
    }

    let paymentId = notification?.data?.id || notification?.id || req.query?.id;

    if (!paymentId && notification?.resource) {
      paymentId = notification.resource.split("/").pop();
    }

    if (!paymentId) {
      return res.status(200).json({ received: true });
    }

    let externalReference = null;
    let paymentStatus = "approved"; // Por defecto asumimos aprobado si viene directo de IPN de pago

    // Intentamos consultar la API de Mercado Pago
    const mpResponse = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`
        }
      }
    );

    if (mpResponse.ok) {
      const payment = await mpResponse.json();
      paymentStatus = payment.status;
      externalReference = payment.external_reference;
      console.log("ESTADO PAGO (API):", paymentStatus);
    } else {
      console.log("No se pudo consultar la API, intentando extraer referencia de la notificación...");
      // Plan de respaldo: si Mercado Pago mandó datos extra en el body
      externalReference = notification?.external_reference || notification?.data?.external_reference;
    }

    if (paymentStatus !== "approved") {
      console.log("El pago no está aprobado:", paymentStatus);
      return res.status(200).json({ received: true });
    }

    if (!externalReference || !externalReference.includes("__")) {
      console.log("External reference no encontrado o inválido:", externalReference);
      return res.status(200).json({ received: true });
    }

    const [userId, cursoId] = externalReference.split("__");

    const supabase = createClient(
      "https://yzdahaabjghseosuhvzu.supabase.co",
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Evitar duplicados
    const { data: compraExistente } = await supabase
      .from("compras")
      .select("id")
      .eq("payment_id", String(paymentId))
      .maybeSingle();

    if (compraExistente) {
      console.log("La compra ya fue registrada.");
      return res.status(200).json({ received: true, duplicate: true });
    }

    // Guardar en Supabase
    const { data, error } = await supabase
      .from("compras")
      .insert([
        {
          user_id: userId,
          curso_id: Number(cursoId),
          payment_id: String(paymentId),
          estado: "approved"
        }
      ])
      .select();

    if (error) {
      console.error("ERROR AL GUARDAR EN SUPABASE:", error);
      return res.status(200).json({ received: true, db_error: true });
    }

    console.log("COMPRA GUARDADA EXITOSAMENTE:", data);
    return res.status(200).json({ received: true, success: true });

  } catch (error) {
    console.error("ERROR CRITICO:", error.message);
    return res.status(200).json({ received: true, error: error.message });
  }
}