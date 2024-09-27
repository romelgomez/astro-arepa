// components/posts/columns.tsx
'use client';

import { Button } from '@/components/ui/button';
// import { useToast } from '@/hooks/use-toast';
import type { ColumnDef } from '@tanstack/react-table';

// Define the type for your posts
export type Post = {
  id: string;
  title: string;
  sub_title: string;
  published: boolean;
  description: string;
};

export const columns: ColumnDef<Post>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'sub_title',
    header: 'Subtitle',
  },
  {
    accessorKey: 'published',
    header: 'Published',
    cell: ({ row }) => <span>{row.getValue('published') ? 'Yes' : 'No'}</span>,
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const postId = row.original.id;
      // const { toast } = useToast();

      // Function to handle the delete action
      // const handleDelete = async () => {
      //   const confirmed = confirm('Are you sure you want to delete this post?');
      //   if (!confirmed) return;

      //   try {
      //     const response = await fetch(
      //       `http://localhost:3000/api/v1/post/${postId}`,
      //       {
      //         method: 'DELETE',
      //       },
      //     );

      //     if (response.ok) {
      //       toast({
      //         title: 'Success',
      //         description: 'Post deleted successfully!',
      //       });
      //       // Optionally, trigger a refetch of your data here to update the table
      //       window.location.reload(); // Refresh the page to update the data (or refetch data in a more optimized way)
      //     } else {
      //       const errorData = await response.json();
      //       toast({
      //         title: 'Error',
      //         description: errorData.message || 'Failed to delete post',
      //         variant: 'destructive',
      //       });
      //     }
      //   } catch (error) {
      //     toast({
      //       title: 'An unexpected error occurred.',
      //       description: 'Please try again later.',
      //       variant: 'destructive',
      //     });
      //   }
      // };

      return (
        <div className='flex space-x-2'>
          <a href={`/posts/view/${postId}`}>
            <Button variant='outline' size='sm'>
              View
            </Button>
          </a>
          <a href={`/posts/edit/${postId}`}>
            <Button variant='outline' size='sm'>
              Edit
            </Button>
          </a>
          {/* <Button variant='destructive' size='sm' onClick={handleDelete}>
            Delete
          </Button> */}
          {/* <Button variant='destructive' size='sm' onClick={handleToast}>
            toast
          </Button> */}
        </div>
      );
    },
  },
];
