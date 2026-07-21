import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // O process.env.SUPABASE_ANON_KEY según uses
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const topic = req.query.topic || req.body.type;

  if (topic === 'payment') {
    const paymentId = req.query.id || req.body.data?.id;

    try {
      // 1. Consultar el pago a la API de Mercado Pago
      const mpResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`
        }
      });
      const paymentData = await mpResponse.json();

      if (paymentData.status === 'approved') {
        const userId = paymentData.external_reference;
        const courseId = paymentData.additional_info?.items?.[0]?.id || paymentData.items?.[0]?.id;

        if (userId && courseId) {
          // 2. Guardar la compra automáticamente en Supabase
          const { error } = await supabase
            .from('compras')
            .insert([
              { 
                user_id: userId, 
                curso_id: String(courseId), 
                estado: 'approved' 
              }
            ]);

          if (error) {
            console.error('Error al insertar en Supabase:', error);
          }
        }
      }
    } catch (err) {
      console.error('Error procesando webhook:', err);
    }
  }

  return res.status(200).json({ received: true });
}