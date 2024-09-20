import { useState } from 'react';
import { z } from 'zod';
import { contactSchema } from '../schemas/contact';
import type { ContactFormData } from '../schemas/contact';

export default function Form() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [responseMessage, setResponseMessage] = useState<string>('');

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const validateForm = (data: ContactFormData) => {
    try {
      contactSchema.parse(data);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.reduce(
          (acc, curr) => {
            acc[curr.path[0]] = curr.message;
            return acc;
          },
          {} as Record<string, string>,
        );
        setErrors(formattedErrors);
      }
      return false;
    }
  };

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();

    setErrors({}); // Limpiar errores previos

    if (!validateForm(formData)) {
      return;
    }

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setResponseMessage('¡Formulario enviado correctamente!');
    } else {
      setResponseMessage('Hubo un error al enviar el formulario.');
    }
  };

  return (
    <div>
      <h1>Contáctanos</h1>
      <form onSubmit={submitForm}>
        <div>
          <div>
            <label htmlFor='name'>Nombre:</label>
          </div>
          <div>
            <input
              id='name'
              type='text'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
          </div>
        </div>

        <div>
          <label htmlFor='email'>Correo electrónico:</label>
          <div>
            <input
              id='email'
              type='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <div>
              {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
            </div>
          </div>
        </div>

        <div>
          <div>
            <label htmlFor='message'>Mensaje:</label>
          </div>
          <div>
            <textarea
              id='message'
              name='message'
              value={formData.message}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            {errors.message && <p style={{ color: 'red' }}>{errors.message}</p>}
          </div>
        </div>

        <div>
          <button type='submit'>Enviar</button>
        </div>
      </form>

      <p>{responseMessage}</p>
    </div>
  );
}
