import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yzdahaabjghseosuhvzu.supabase.co";

const supabase = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {

  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );


  // Preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }


  // Mercado Pago solo necesita POST
  if (req.method !== "POST") {
    return res.status(200).json({
      message: "Webhook activo"
    });
  }


  try {

    console.log("========== WEBHOOK MERCADO PAGO ==========");
    console.log(JSON.stringify(req.body, null, 2));


    const notification = req.body;


    const type =
      notification?.type ||
      notification?.topic;


    let paymentId =
      notification?.data?.id ||
      notification?.id;


    // Compatibilidad con formato antiguo
    if (!paymentId && notification?.resource) {
      paymentId = notification.resource.split("/").pop();
    }


    console.log("Tipo:", type);
    console.log("Payment ID:", paymentId);



    // Si no es pago ignoramos
    if (type !== "payment" || !paymentId) {

      console.log("Evento ignorado");

      return res.status(200).json({
        received: true
      });
    }



    // Consultar pago en Mercado Pago

    const mpResponse = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization:
            `Bearer ${process.env.MP_ACCESS_TOKEN}`
        }
      }
    );


    if (!mpResponse.ok) {

      console.log(
        "Pago no encontrado en Mercado Pago:",
        mpResponse.status
      );


      return res.status(200).json({
        received: true
      });
    }



    const payment = await mpResponse.json();


    console.log(
      "DATOS DEL PAGO:",
      JSON.stringify(payment, null, 2)
    );



    // Solo guardar pagos aprobados

    if (payment.status !== "approved") {

      console.log(
        "Pago no aprobado:",
        payment.status
      );


      return res.status(200).json({
        received: true
      });
    }



    const externalReference =
      payment.external_reference;


    console.log(
      "External Reference:",
      externalReference
    );


    let userId = externalReference;
    let cursoId = null;



    if (
      externalReference &&
      externalReference.includes("__")
    ) {

      const partes =
        externalReference.split("__");


      userId = partes[0];
      cursoId = partes[1];

    }



    console.log("Usuario:", userId);
    console.log("Curso:", cursoId);



    // Guardar compra en Supabase

    const { data, error } =
      await supabase
        .from("compras")
        .insert([
          {
            user_id: userId,
            curso_id: cursoId,
            estado: "approved",
            payment_id: paymentId
          }
        ])
        .select();



    if (error) {

      console.error(
        "ERROR SUPABASE:",
        error
      );

      // Respondemos 200 para que MP no reintente
      return res.status(200).json({
        received: true,
        supabase_error: true
      });

    }



    console.log(
      "COMPRA GUARDADA:",
      data
    );



    return res.status(200).json({
      received: true,
      success: true
    });



  } catch (error) {


    console.error(
      "ERROR WEBHOOK:",
      error
    );


    // Importante:
    // Mercado Pago no debe recibir 500 constantemente
    return res.status(200).json({
      received: true,
      error: true
    });

  }

}