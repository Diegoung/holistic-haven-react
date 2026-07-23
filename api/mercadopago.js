import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://yzdahaabjghseosuhvzu.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log("=== WEBHOOK MERCADO PAGO ===");
    console.log(JSON.stringify(req.body, null, 2));

    const topic = req.query.topic || req.body.type;

    let paymentId =
      req.query.id ||
      req.body?.data?.id;

    // Compatibilidad con notificaciones que usan "resource"
    if (!paymentId && req.body.resource) {
      paymentId = req.body.resource.split('/').pop();
    }

    console.log("Topic:", topic);
    console.log("Payment ID:", paymentId);

    if (topic !== 'payment' || !paymentId) {
      console.log("Notificación ignorada.");
      return res.status(200).json({ received: true });
    }

    // Consultar el pago en Mercado Pago
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

    if (paymentData.status !== 'approved') {
      console.log(`Pago ignorado. Estado: ${paymentData.status}`);
      return res.status(200).json({ received: true });
    }

    const externalReference = paymentData.external_reference;

    console.log("External Reference:", externalReference);

    if (!externalReference || !externalReference.includes('__')) {
      console.error("External Reference inválido.");
      return res.status(200).json({ received: true });
    }

    const [userId, courseId] = externalReference.split('__');

    console.log("User ID:", userId);
    console.log("Course ID:", courseId);

    // Evitar duplicados
    const { data: existente } = await supabase
      .from('compras')
      .select('id')
      .eq('user_id', userId)
      .eq('curso_id', courseId)
      .maybeSingle();

    if (existente) {
      console.log("La compra ya estaba registrada.");
      return res.status(200).json({ received: true });
    }

    const { data, error } = await supabase
      .from('compras')
      .insert([
        {
          user_id: userId,
          curso_id: courseId,
          estado: 'approved',
        },
      ])
      .select();

    if (error) {
      console.error("=== ERROR SUPABASE ===");
      console.error(error);
    } else {
      console.log("=== COMPRA REGISTRADA ===");
      console.log(data);
    }

    return res.status(200).json({ received: true });

  } catch (err) {
    console.error("=== ERROR GENERAL ===");
    console.error(err);

    return res.status(500).json({
      error: err.message,
    });
  }
}