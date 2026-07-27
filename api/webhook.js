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

    let paymentId = notification?.data?.id || notification?.id || req.query?.id;

    if (!paymentId && notification?.resource) {
      const parts = notification.resource.split("/");
      paymentId = parts[parts.length - 1];
    }

    // Si de verdad no hay ningún ID, evitamos que rompa pero respondemos OK
    if (!paymentId || paymentId === "123456") {
      console.log("Notificación de prueba o sin ID detectada.");
      return res.status(200).json({ received: true, test: true });
    }

    console.log("Consultando pago en Mercado Pago ID:", paymentId);

    const mpResponse = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`
        }
      }
    );

    if (!mpResponse.ok) {
      console.log(`No se pudo consultar el pago ${paymentId} en MP. Código: ${mpResponse.status}`);
      return res.status(200).json({ received: true });
    }

    const payment = await mpResponse.json();
    console.log("ESTADO DEL PAGO:", payment.status);

    if (payment.status !== "approved") {
      console.log("El pago no está aprobado, estado actual:", payment.status);
      return res.status(200).json({ received: true });
    }

    const externalReference = payment.external_reference;
    console.log("EXTERNAL REFERENCE:", externalReference);

    if (!externalReference || !externalReference.includes("__")) {
      console.log("External reference inválido o vacío:", externalReference);
      return res.status(200).json({ received: true });
    }

    const [userId, cursoId] = externalReference.split("__");

    const supabase = createClient(
      "https://yzdahaabjghseosuhvzu.supabase.co",
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Verificar duplicados
    const { data: compraExistente } = await supabase
      .from("compras")
      .select("id")
      .eq("payment_id", String(paymentId))
      .maybeSingle();

    if (compraExistente) {
      console.log("La compra ya estaba registrada.");
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

    console.log("¡COMPRA GUARDADA EN SUPABASE EXITOSAMENTE!:", data);
    return res.status(200).json({ received: true, success: true });

  } catch (error) {
    console.error("ERROR CRÍTICO:", error.message);
    return res.status(200).json({ received: true, error: error.message });
  }
}