export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  const { title, price, userId, courseId } = req.body;

  try {
    const testUserId =
      userId || "00000000-0000-0000-0000-000000000000";

    const response = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            {
              id: courseId || "curso",
              title: title || "Curso Holístico DMF",
              quantity: 1,
              unit_price: Number(price),
              currency_id: "ARS",
            },
          ],

          notification_url:
            "https://www.terapiasholisticasdmf.com/api/webhook",

          external_reference:
            `${testUserId}__${courseId || "curso"}`,
        }),
      }
    );


    const data = await response.json();


    if (!response.ok) {
      console.error(
        "Mercado Pago error:",
        data
      );

      return res.status(response.status).json(data);
    }


    return res.status(200).json({
      id: data.id,
      init_point: data.init_point,
    });


  } catch (error) {

    console.error(
      "Error creando preferencia:",
      error
    );


    return res.status(500).json({
      error: error.message,
    });

  }
}