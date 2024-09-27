// src/schemas/post.ts
import { z } from 'zod';

export const postSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  sub_title: z.string().max(100, 'Subtitle is too long').optional(),
  published: z.boolean(),
  description: z.string().min(1, 'Description is required'),
});

export type PostFormData = z.infer<typeof postSchema>;
