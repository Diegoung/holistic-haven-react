import { createClient } from '@supabase/supabase-js';

// Inicializamos Supabase para el entorno del Servidor
const supabaseUrl = 'https://yzdahaabjghseosuhvzu.supabase.co';
const supabaseAnonKey = 'sb_publishable_zToT-5b9ECcjQYSV9gS_dA_JkODhIwf';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  // Configuración de CORS
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

    // Mercado Pago puede mandar la noti de distintas formas según el tipo de evento
    const topic = notification.type || notification.topic;
    const paymentId = notification?.data?.id || notification?.id;

    // Solo nos interesa procesar cuando el evento es de pago
    if (topic === 'payment' && paymentId) {
      // 1. Consultar a la API de Mercado Pago los detalles reales del pago
      const mpResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          // Acá idealmente irá tu Token Privado de Mercado Pago (AccessToken)
          // 'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`
        }
      });

      // Si querés evitar el fetch por ahora, podemos capturar directo el ID. 
      // Pero lo ideal es registrar en la tabla 'compras' que el pago ID llegó.
      
      console.log(`Procesando pago ID: ${paymentId}`);

      // 2. Registrar o actualizar en Supabase (tabla 'compras')
      // Aquí guardamos el estado del pago asociado
      const { data, error } = await supabase
        .from('compras')
        .upsert([
          { 
            payment_id: String(paymentId), 
            status: 'approved', // O el estado que venga de MP
            updated_at: new Date() 
          }
        ], { onConflict: 'payment_id' });

      if (error) {
        console.error('Error al guardar en Supabase:', error);
      } else {
        console.log('Compra actualizada/guardada en Supabase con éxito:', data);
      }
    }

    // Mercado Pago exige siempre un status 200 rápido para confirmar que lo recibimos
    return res.status(200).json({ received: true });

  } catch (error) {
    console.error("Error crítico en el webhook:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}