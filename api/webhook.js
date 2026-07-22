export default async function handler(req, res) {
  // Mercado Pago envía las notificaciones por método POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const notification = req.body;

    // Aquí podés ver en los logs de Vercel lo que llega desde Mercado Pago
    console.log('Notificación recibida de Mercado Pago:', JSON.stringify(notification));

    // Validamos el tipo de evento (puede ser payment o ipn según configures)
    const topic = req.query.topic || notification.type || notification.action;

    if (topic === 'payment' || topic === 'payment.created' || topic === 'payment.updated') {
      const paymentId = notification.data?.id || notification.id;

      if (paymentId) {
        // Aquí se procesaría la consulta a la API de Mercado Pago para verificar el pago
        console.log(`Procesando pago con ID: ${paymentId}`);
      }
    }

    // Es fundamental responder siempre un 200 OK para que Mercado Pago sepa que se recibió bien
    return res.status(200).json({ received: true });
    
  } catch (error) {
    console.error('Error al procesar el webhook:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}