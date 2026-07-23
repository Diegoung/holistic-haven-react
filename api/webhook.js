import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://yzdahaabjghseosuhvzu.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(200).json({ status: 'Webhook endpoint active' });
  }

  try {
    const notification = req.body;

    console.log("=== WEBHOOK RECIBIDO ===");
    console.log(JSON.stringify(notification, null, 2));

    const topic = notification.type || notification.topic;

    let paymentId =
      notification?.data?.id ||
      notification?.id;

    // Compatibilidad con notificaciones que envían "resource"
    if (!paymentId && notification.resource) {
      paymentId = notification.resource.split('/').pop();
    }

    console.log("Topic:", topic);
    console.log("Payment ID:", paymentId);

    if (topic === 'payment' && paymentId) {
      console.log(`Consultando pago ${paymentId}...`);

      const mpResponse = await fetch(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
          },
        }
      );

      if (!mpResponse.ok) {
        console.error(
          "Error consultando Mercado Pago:",
          mpResponse.status,
          mpResponse.statusText
        );
        return res.status(200).json({ received: true });
      }

      const paymentData = await mpResponse.json();

      console.log("=== DATOS DEL PAGO ===");
      console.log(JSON.stringify(paymentData, null, 2));

      if (paymentData.status !== "approved") {
        console.log(`Pago ignorado. Estado: ${paymentData.status}`);
        return res.status(200).json({ received: true });
      }

      const externalReference = paymentData.external_reference;

      console.log("External Reference:", externalReference);

      let userId = externalReference;
      let cursoId = null;

      if (externalReference && externalReference.includes("__")) {
        const parts = externalReference.split("__");
        userId = parts[0];
        cursoId = parts[1];
      }

      console.log("User ID:", userId);
      console.log("Curso ID:", cursoId);

      const { data, error } = await supabase
        .from("compras")
        .insert([
          {
            user_id: userId,
            curso_id: cursoId,
            estado: "approved",
          },
        ])
        .select();

      if (error) {
        console.error("=== ERROR SUPABASE ===");
        console.error(error);
      } else {
        console.log("=== COMPRA INSERTADA ===");
        console.log(data);
      }
    } else {
      console.log("Notificación ignorada.");
    }

    return res.status(200).json({ received: true });

  } catch (error) {
    console.error("=== ERROR CRÍTICO ===");
    console.error(error);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
}