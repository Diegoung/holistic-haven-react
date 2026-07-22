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
      console.log(`Procesando pago ID: ${paymentId}`);

      // Insertamos usando las columnas reales de tu tabla 'compras'
      const { data, error } = await supabase
        .from('compras')
        .insert([
          { 
            estado: 'approved'
          }
        ]);

      if (error) {
        console.error('Error al guardar en Supabase:', error);
      } else {
        console.log('Compra registrada en Supabase con éxito:', data);
      }
    }

    return res.status(200).json({ received: true });

  } catch (error) {
    console.error("Error crítico en el webhook:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}