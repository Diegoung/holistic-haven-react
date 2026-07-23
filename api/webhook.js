import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yzdahaabjghseosuhvzu.supabase.co';
const supabaseAnonKey = 'sb_publishable_zToT-5b9ECcjQYSV9gS_dA_JkODhIwf';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(200).json({ status: 'Webhook endpoint active' });
  }

  try {
    const notification = req.body;
    console.log("Notificación recibida de Mercado Pago:", JSON.stringify(notification));

    const topic = notification.type || notification.topic;
    const paymentId = notification?.data?.id || notification?.id;

    if (topic === 'payment' && paymentId) {
      console.log(`Consultando detalles del pago ID: ${paymentId} en Mercado Pago...`);

      // Consultamos el pago directamente a la API de Mercado Pago para obtener el external_reference
      const mpResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`
        }
      });

      if (!mpResponse.ok) {
        console.error('Error al consultar el pago en Mercado Pago');
        return res.status(200).json({ received: true });
      }

      const paymentData = await mpResponse.json();
      console.log("Datos del pago obtenidos:", JSON.stringify(paymentData));

      // Verificamos si el pago está aprobado
      if (paymentData.status === 'approved') {
        const externalReference = paymentData.external_reference; // Aquí viene el userId o userId__cursoId
        console.log(`External reference encontrado: ${externalReference}`);

        let userId = externalReference;
        let cursoId = null;

        // Si usaste el formato con dos guiones bajos, los separamos
        if (externalReference && externalReference.includes('__')) {
          const parts = externalReference.split('__');
          userId = parts[0];
          cursoId = parts[1];
        }

        // Insertamos los datos reales en tu tabla 'compras'
        const { data, error } = await supabase
          .from('compras')
          .insert([
            { 
              user_id: userId,
              curso_id: cursoId,
              estado: 'approved'
            }
          ]);

        if (error) {
          console.error('Error al guardar en Supabase:', error);
        } else {
          console.log('Compra registrada en Supabase con éxito:', data);
        }
      }
    }

    return res.status(200).json({ received: true });

  } catch (error) {
    console.error("Error crítico en el webhook:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}