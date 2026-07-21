import { createClient } from '@supabase/supabase-js';

// Inicializar cliente de Supabase usando variables de entorno
const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; 

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req, res) {
  // Solo permitir solicitudes POST que son las que envía Mercado Pago
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { type, data } = req.body;

    // Verificar si es una notificación de pago
    if (type === 'payment' && data?.id) {
      const paymentId = data.id;

      // 1. Consultar a la API de Mercado Pago para verificar el estado real del pago
      const mpResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`
        }
      });

      const payment = await mpResponse.json();

      // 2. Si el pago está APROBADO
      if (payment.status === 'approved') {
        // Extraemos el ID del usuario y el ID del curso pasados en la preferencia
        const userId = payment.external_reference; 
        const cursoId = payment.additional_info?.items?.[0]?.id;

        if (userId && cursoId) {
          // 3. Insertar o actualizar la compra en Supabase automáticamente
          const { error } = await supabase.from('compras').upsert([
            {
              user_id: userId,
              curso_id: cursoId,
              estado: 'approved',
              payment_id: paymentId,
              created_at: new Date().toISOString()
            }
          ], { onConflict: 'user_id, curso_id' });

          if (error) {
            console.error('Error al registrar la compra en Supabase:', error);
          }
        }
      }
    }

    // Responder 200 OK a Mercado Pago para confirmar la recepción
    return res.status(200).send('OK');
  } catch (error) {
    console.error('Error en Webhook Mercado Pago:', error);
    return res.status(500).json({ error: error.message });
  }
}