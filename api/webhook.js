import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://yzdahaabjghseosuhvzu.supabase.co",
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

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
    return res.status(200).json({
      message: "Webhook activo"
    });
  }

  try {
    console.log("========== WEBHOOK MERCADO PAGO ==========");
    console.log(JSON.stringify(req.body, null, 2));

    const notification = req.body;

    // Si es la prueba directa del panel de Mercado Pago con el ID genérico, responder OK de inmediato
    if (notification?.action === "payment.updated" && notification?.data?.id === "123456") {
      console.log("Prueba del panel de Mercado Pago recibida con éxito.");
      return res.status(200).json({ received: true });
    }

    const type =
      notification?.type ||
      notification?.topic ||
      req.query?.topic ||
      notification?.action?.split(".")[0];

    let paymentId =
      notification?.data?.id ||
      notification?.id ||
      req.query?.id;

    if (!paymentId && notification?.resource) {
      paymentId = notification.resource.split("/").pop();
    }

    console.log("TIPO:", type);
    console.log("PAYMENT ID:", paymentId);

    if (!paymentId || type !== "payment") {
      console.log("Evento ignorado (no es pago o falta ID)");
      return res.status(200).json({ received: true });
    }

    // Evitar que falle si es otra simulación de prueba con IDs falsos
    if (String(paymentId).length < 5) {
      console.log("Simulación de prueba detectada con ID corto.");
      return res.status(200).json({ received: true, test: true });
    }

    const mpResponse = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`
        }
      }
    );

    if (!mpResponse.ok) {
      console.error("Error consultando MP. Estado:", mpResponse.status);
      return res.status(200).json({ received: true });
    }

    const payment = await mpResponse.json();

    console.log("ESTADO PAGO:", payment.status);

    if (payment.status !== "approved") {
      console.log("Pago pendiente o rechazado");
      return res.status(200).json({ received: true });
    }

    const externalReference = payment.external_reference;

    console.log("EXTERNAL REFERENCE:", externalReference);

    let userId = null;
    let cursoId = null;

    if (externalReference && externalReference.includes("__")) {
      const partes = externalReference.split("__");
      userId = partes[0];
      cursoId = partes[1];
    }

    console.log("USER ID:", userId);
    console.log("CURSO ID:", cursoId);

    // Validación de seguridad de los datos custom
    if (!userId || !cursoId) {
      console.log("Falta usuario o curso en el external_reference");
      return res.status(200).json({ received: true });
    }

    // Evitar compras duplicadas chequeando el payment_id
    const { data: compraExistente } = await supabase
      .from("compras")
      .select("id")
      .eq("payment_id", String(paymentId))
      .maybeSingle();

    if (compraExistente) {
      console.log("Compra ya registrada con este payment_id");
      return res.status(200).json({ received: true, duplicate: true });
    }

    // Guardar compra aprobada
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
      console.error("ERROR SUPABASE:", error);
      return res.status(200).json({ received: true, error: true });
    }

    console.log("COMPRA GUARDADA:", data);
    return res.status(200).json({ received: true, success: true });

  } catch (error) {
    console.error("ERROR WEBHOOK:", error);
    return res.status(200).json({ received: true, error: true });
  }
}