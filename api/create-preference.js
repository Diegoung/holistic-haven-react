export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { title, price, userId, courseId } = req.body;

  try {
    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [
          {
            id: courseId,
            title: title,
            unit_price: Number(price),
            quantity: 1,
            currency_id: 'ARS',
          },
        ],
        notification_url: 'https://terapiasholisticasdmf.com/api/mercadopago', // Asegúrate de que esta URL apunte a tu webhook de Vercel (/api/webhook) si corresponde
        external_reference: `${userId}__${courseId}`,
      }),
    });

    const data = await response.json();
    return res.status(200).json({ init_point: data.init_point });
  } catch (error) {
    console.error('Error al crear la preferencia:', error);
    return res.status(500).json({ error: error.message });
  }
}