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
    
    const notification = req.body;

    // Si es la prueba genérica del panel de Mercado Pago, responder OK de inmediato
    if (notification?.data?.id === "123456" || notification?.id === "123456") {
      console.log("Prueba de Mercado Pago detectada.");
      return res.status(200).json({ received: true, test: true });
    }

    let paymentId = notification?.data?.id || notification?.id || req.query?.id;

    if (!paymentId && notification?.resource) {
      paymentId = notification.resource.split("/").pop();
    }

    if (!paymentId) {
      console.log("No se encontró ID de pago en la notificación.");
      return res.status(200).json({ received: true });
    }

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
      console.error("Error al consultar la API de Mercado Pago:", mpResponse.status);
      return res.status(200).json({ received: true });
    }

    const payment = await mpResponse.json();
    console.log("ESTADO PAGO:", payment.status);

    if (payment.status !== "approved") {
      console.log("El pago no está aprobado todavía.");
      return res.status(200).json({ received: true });
    }

    const externalReference = payment.external_reference;
    console.log("EXTERNAL REFERENCE:", externalReference);

    if (!externalReference || !externalReference.includes("__")) {
      console.log("External reference inválido o faltante.");
      return res.status(200).json({ received: true });
    }

    const [userId, cursoId] = externalReference.split("__");

    // Inicializar Supabase dentro de la función para evitar fallos de arranque global
    const supabase = createClient(
      "https://yzdahaabjghseosuhvzu.supabase.co",
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Evitar duplicados chequeando si el payment_id ya existe
    const { data: compraExistente } = await supabase
      .from("compras")
      .select("id")
      .eq("payment_id", String(paymentId))
      .maybeSingle();

    if (compraExistente) {
      console.log("La compra con este payment_id ya fue registrada anteriormente.");
      return res.status(200).json({ received: true, duplicate: true });
    }

    // Guardar la compra aprobada en Supabase
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
    console.error("ERROR CRITICO EN WEBHOOK:", error.message);
    return res.status(200).json({ received: true, error: error.message });
  }
}