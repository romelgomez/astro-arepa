import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  email: z.string().email('Correo electrónico inválido'),
  message: z.string().min(1, 'El mensaje es obligatorio'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
