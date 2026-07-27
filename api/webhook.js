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
    const notification = req.body;
    console.log("NOTIFICACIÓN RECIBIDA:", JSON.stringify(notification));

    let paymentId = null;

    // Detectar si es una notificación de tipo pago directo o IPN
    if (notification?.type === "payment" || notification?.action === "payment.created" || notification?.action === "payment.updated") {
      paymentId = notification?.data?.id;
    } 
    // Si viene por el sistema viejo de webhooks o query params
    else if (notification?.id && !notification?.type) {
      paymentId = notification.id;
    }
    else if (notification?.resource) {
      const parts = notification.resource.split("/");
      if (parts.includes("payments")) {
        paymentId = parts[parts.length - 1];
      }
    }

    // Si es un merchant_order o no encontramos un ID de pago directo, respondemos OK y salimos para que no tire error
    if (!paymentId) {
      console.log("Notificación ignorada (no es un pago directo o falta ID).");
      return res.status(200).json({ received: true, ignored: true });
    }

    console.log("Consultando pago ID en Mercado Pago:", paymentId);

    // Consultar el pago en la API de Mercado Pago
    const mpResponse = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`
        }
      }
    );

    if (!mpResponse.ok) {
      console.log(`No se pudo consultar el pago ${paymentId} en MP. Estado: ${mpResponse.status}`);
      return res.status(200).json({ received: true });
    }

    const payment = await mpResponse.json();
    console.log("ESTADO DEL PAGO:", payment.status);

    if (payment.status !== "approved") {
      console.log("El pago todavía no está aprobado.");
      return res.status(200).json({ received: true });
    }

    const externalReference = payment.external_reference;
    console.log("EXTERNAL REFERENCE OBTENIDO:", externalReference);

    if (!externalReference || !externalReference.includes("__")) {
      console.log("El pago aprobado no tiene un external_reference válido:", externalReference);
      return res.status(200).json({ received: true });
    }

    const [userId, cursoId] = externalReference.split("__");

    const supabase = createClient(
      "https://yzdahaabjghseosuhvzu.supabase.co",
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Verificar si ya se registró este pago para evitar duplicados
    const { data: compraExistente } = await supabase
      .from("compras")
      .select("id")
      .eq("payment_id", String(paymentId))
      .maybeSingle();

    if (compraExistente) {
      console.log("Esta compra ya fue registrada previamente en Supabase.");
      return res.status(200).json({ received: true, duplicate: true });
    }

    // Guardar la compra en Supabase
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

    console.log("¡COMPRA GUARDADA EXITOSAMENTE EN SUPABASE!:", data);
    return res.status(200).json({ received: true, success: true });

  } catch (error) {
    console.error("ERROR CRÍTICO EN WEBHOOK:", error.message);
    return res.status(200).json({ received: true, error: error.message });
  }
}