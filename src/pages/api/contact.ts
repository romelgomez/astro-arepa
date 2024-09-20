import type { APIRoute } from 'astro';
import { contactSchema } from '../../schemas/contact';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    // Validación del lado del servidor
    contactSchema.parse(data);

    // Aquí puedes procesar los datos, como guardarlos en una base de datos o enviar un correo
    console.log('Datos validados:', data);

    return new Response(
      JSON.stringify({ message: 'Formulario enviado con éxito' }),
      {
        status: 200,
      },
    );
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ message: error.message }), {
        status: 400,
      });
    }
    return new Response(JSON.stringify({ message: 'Error inesperado' }), {
      status: 500,
    });
  }
};
