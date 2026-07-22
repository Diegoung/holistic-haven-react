export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(200).json({ status: 'Webhook activo y funcionando' });
  }

  try {
    const notification = req.body;
    console.log('Notificación recibida:', JSON.stringify(notification));

    const paymentId = notification?.data?.id || notification?.id;
    if (paymentId) {
      console.log(`Procesando pago ID: ${paymentId}`);
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}