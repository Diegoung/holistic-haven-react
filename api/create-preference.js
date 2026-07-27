export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // ¡Aquí faltaba capturar courseId!
  const { title, price, userId, courseId } = req.body;

  try {
    if (!userId || !courseId) {
      return res.status(400).json({ error: "Falta userId o courseId" });
    }

    const response = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          items: [
            {
              title: title || "Curso Holístico DMF",
              quantity: 1,
              unit_price: Number(price),
              currency_id: "ARS"
            }
          ],
          external_reference: `${userId}__${courseId}`,
          notification_url: "https://www.terapiasholisticasdmf.com/api/webhook",
          back_urls: {
            success: "https://www.terapiasholisticasdmf.com/servicios?payment=success",
            failure: "https://www.terapiasholisticasdmf.com/servicios?payment=failure",
            pending: "https://www.terapiasholisticasdmf.com/servicios?payment=pending"
          },
          auto_return: "approved"
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("MP ERROR", data);
      return res.status(400).json(data);
    }

    return res.status(200).json({
      id: data.id,
      init_point: data.init_point
    });

  } catch (error) {
    console.error("ERROR CREATE PREFERENCE", error);
    return res.status(500).json({ error: error.message });
  }
}