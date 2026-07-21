import { createClient } from '@supabase/supabase-js';
import { MercadoPagoConfig, Payment } from 'mercadopago';

// Inicializamos Supabase con tus credenciales reales
const supabase = createClient(
  'https://yzdahaabjghseosuhvzu.supabase.co',
  'sb_secret_1Fz29r2RZbUaVzije9lfRQ_dtMh8eb_'
);

// Inicializamos Mercado Pago con tu Access Token real
const client = new MercadoPagoConfig({ 
  accessToken: 'APP_USR-5d6423c8-252e-41f1-a849-abebcf1a502b' 
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const body = req.body;

    if (body.type === 'payment' || body.action === 'payment.created' || body.action === 'payment.updated') {
      const paymentId = body.data?.id || body.id;

      if (paymentId) {
        const payment = new Payment(client);
        const paymentInfo = await payment.get({ id: paymentId });

        if (paymentInfo.status === 'approved') {
          const userEmail = paymentInfo.payer?.email || paymentInfo.metadata?.user_email;
          const courseId = paymentInfo.external_reference || paymentInfo.metadata?.course_id;

          if (userEmail && courseId) {
            // Buscamos el ID del usuario en Supabase por su email
            const { data: profileData } = await supabase
              .from('profiles') // Cambiá esto si tu tabla de usuarios se llama diferente
              .select('id')
              .eq('email', userEmail)
              .single();

            const userId = profileData?.id;

            if (userId) {
              // Registramos la compra en la tabla de accesos
              await supabase
                .from('user_courses') // Cambiá esto por el nombre real de tu tabla de compras
                .upsert([
                  { 
                    user_id: userId, 
                    course_id: courseId, 
                    payment_id: paymentId,
                    created_at: new Date() 
                  }
                ], { onConflict: 'user_id,course_id' });
            }
          }
        }
      }
    }

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Error en el webhook:', error);
    return res.status(500).json({ error: error.message });
  }
}