export default async function handler(req, res) {
  // Configurar CORS por seguridad
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Si es una petición OPTIONS (preflight), respondemos OK de inmediato
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Si entran por el navegador con GET, respondemos que está activo
  if (req.method !== 'POST') {
    return res.status(200).json({ status: 'Webhook endpoint active and listening for POST requests' });
  }

  try {
    const notification = req.body;
    console.log('Notificación recibida de Mercado Pago:', JSON.stringify(notification));

    const paymentId = notification?.data?.id || notification?.id;
    if (paymentId) {
      console.log(`Pago detectado con ID: ${paymentId}`);
      // Aquí irá la lógica para impactar el pago en tu base de datos o sistema
    }

    // Mercado Pago exige un status 200 para confirmar la recepción
    return res.status(200).json({ received: true });

  } catch (error) {
    console.error('Error procesando el webhook:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}