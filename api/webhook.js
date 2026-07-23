import { createClient } from "@supabase/supabase-js";


const supabase = createClient(
  "https://yzdahaabjghseosuhvzu.supabase.co",
  process.env.SUPABASE_SERVICE_ROLE_KEY
);



export default async function handler(req, res) {


  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }



  if (req.method !== "POST") {

    return res.status(200).json({
      message: "Webhook activo"
    });

  }



  try {


    console.log(
      "========== WEBHOOK MERCADO PAGO =========="
    );


    console.log(
      JSON.stringify(req.body, null, 2)
    );



    const notification = req.body;



    const type =
      notification?.type ||
      notification?.topic ||
      notification?.action?.split(".")[0];



    let paymentId =
      notification?.data?.id ||
      notification?.id;



    if (!paymentId && notification?.resource) {

      paymentId =
        notification.resource.split("/").pop();

    }



    console.log(
      "TIPO:",
      type
    );


    console.log(
      "PAYMENT ID:",
      paymentId
    );



    if (!paymentId || type !== "payment") {


      console.log(
        "Evento ignorado"
      );


      return res.status(200).json({
        received:true
      });


    }




    const mpResponse = await fetch(

      `https://api.mercadopago.com/v1/payments/${paymentId}`,

      {

        headers:{

          Authorization:
          `Bearer ${process.env.MP_ACCESS_TOKEN}`

        }

      }

    );



    const payment =
      await mpResponse.json();



    console.log(
      "ESTADO PAGO:",
      payment.status
    );



    if(payment.status !== "approved"){


      console.log(
        "Pago pendiente o rechazado"
      );


      return res.status(200).json({
        received:true
      });


    }




    const externalReference =
      payment.external_reference;



    console.log(
      "EXTERNAL REFERENCE:",
      externalReference
    );




    let userId = null;
    let cursoId = null;



    if(
      externalReference &&
      externalReference.includes("__")
    ){


      const partes =
      externalReference.split("__");


      userId = partes[0];

      cursoId = partes[1];


    }




    console.log(
      "USER ID:",
      userId
    );


    console.log(
      "CURSO ID:",
      cursoId
    );





    // Validación seguridad

    if(!userId || !cursoId){


      console.log(
        "Falta usuario o curso"
      );


      return res.status(200).json({
        received:true
      });


    }






    // Evitar compras duplicadas


    const {data: compraExistente} =
    await supabase
    .from("compras")
    .select("id")
    .eq(
      "payment_id",
      String(paymentId)
    )
    .maybeSingle();





    if(compraExistente){


      console.log(
        "Compra ya registrada"
      );


      return res.status(200).json({

        received:true,

        duplicate:true

      });


    }







    // Guardar compra aprobada


    const {data,error} =
    await supabase
    .from("compras")
    .insert([

      {

        user_id:userId,

        curso_id:Number(cursoId),

        payment_id:String(paymentId),

        estado:"approved"

      }

    ])
    .select();






    if(error){


      console.error(
        "ERROR SUPABASE:",
        error
      );


      return res.status(200).json({

        received:true,

        error:true

      });


    }







    console.log(
      "COMPRA GUARDADA:",
      data
    );





    return res.status(200).json({

      received:true,

      success:true

    });





  }catch(error){


    console.error(
      "ERROR WEBHOOK:",
      error
    );


    return res.status(200).json({

      received:true,

      error:true

    });


  }



}