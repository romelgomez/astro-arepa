'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { PostResponse } from '../types/post';

const PUBLIC_API_BASE_URL = import.meta.env.PUBLIC_API_BASE_URL;

const postSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, { message: 'Title is required' }),
  sub_title: z
    .string()
    .max(100, { message: "Subtitle can't be longer than 100 characters" })
    .optional(),
  published: z.boolean().default(false),
  description: z.string().min(1, { message: 'Description is required' }),
});

type PostFormData = z.infer<typeof postSchema>;

interface PostFormProps {
  post?: PostResponse;
  authToken?: string | null;
}

export const PostForm: React.FC<PostFormProps> = ({ post, authToken }) => {
  const form = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: post || {
      title: '',
      sub_title: '',
      published: false,
      description: '',
    },
  });

  useEffect(() => {
    if (post) {
      form.reset(post);
    }
  }, [post, form]);

  async function onSubmit(data: PostFormData) {
    try {
      const response = await fetch(
        `${PUBLIC_API_BASE_URL}${post ? `${post.id}` : ''}`,
        {
          method: post ? 'PATCH' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(data),
        },
      );

      if (response.ok) {
        toast.success(
          post ? 'Post updated successfully!' : 'Post created successfully!',
          {
            description: (
              <div className='mt-2 w-full rounded-lg bg-gray-800 p-3'>
                <code className='block text-sm text-gray-200'>
                  {post
                    ? 'The post has been updated.'
                    : 'The post has been saved.'}
                </code>
              </div>
            ),
            position: 'top-center',
            duration: 5000,
          },
        );
      } else if (response.status === 401) {
        toast.error('Unauthorized Access', {
          description: '401 Unauthorized. Please log in and try again.',
          position: 'bottom-right',
          duration: 8000,
        });
      } else {
        const errorData = await response.json();
        toast.error('Error', {
          description: errorData.message || 'Failed to save post',
          position: 'bottom-right',
          duration: 7000,
        });
      }
    } catch (error) {
      toast.error('An unexpected error occurred.', {
        description: 'Please try again later.',
        position: 'bottom-left',
        duration: 7000,
      });
    }
  }

  return (
    <div className='bg-gray-100 p-8 rounded-lg shadow-lg max-w-2xl mx-auto mt-10'>
      <h1 className='text-3xl font-bold mb-8 text-center'>
        {post ? 'Edit Post' : 'Create Post'}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-lg font-semibold'>Title</FormLabel>
                <FormControl>
                  <Input
                    className='w-full p-3 rounded border-gray-300'
                    placeholder='Enter title'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='sub_title'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-lg font-semibold'>
                  Subtitle
                </FormLabel>
                <FormControl>
                  <Input
                    className='w-full p-3 rounded border-gray-300'
                    placeholder='Enter subtitle (optional)'
                    {...field}
                  />
                </FormControl>
                <FormDescription>This is optional.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='published'
            render={({ field }) => (
              <FormItem className='flex items-center space-x-4'>
                <FormLabel className='text-lg font-semibold'>
                  Published
                </FormLabel>
                <FormControl>
                  <Checkbox
                    className='h-5 w-5 rounded border-gray-300'
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>
                  Check if you want to publish this post.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-lg font-semibold'>
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    className='w-full p-3 rounded border-gray-300'
                    placeholder='Enter description'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='text-center'>
            <Button
              className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg'
              type='submit'
            >
              {post ? 'Update Post' : 'Create Post'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
