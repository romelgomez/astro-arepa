



'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast"

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

// Define the schema for form validation using Zod
const postSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  sub_title: z.string().max(100, { message: "Subtitle can't be longer than 100 characters" }).optional(),
  published: z.boolean().default(false),
  description: z.string().min(1, { message: "Description is required" }),
});

type PostFormData = z.infer<typeof postSchema>;

export default function PostForm() {
  const { toast } = useToast()

  const form = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      sub_title: "",
      published: false,
      description: "",
    },
  });

  async function onSubmit(data: PostFormData) {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: "Post created successfully!",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">Post has been saved.</code>
            </pre>
          ),
        });
        form.reset(); // Reset the form fields
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.message || 'Failed to create post',
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "An unexpected error occurred.",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  }
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sub_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subtitle</FormLabel>
              <FormControl>
                <Input placeholder="Enter subtitle (optional)" {...field} />
              </FormControl>
              <FormDescription>This is optional.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="published"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Published</FormLabel>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormDescription>Check if you want to publish this post.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Create Post</Button>
      </form>
    </Form>
  );
}
