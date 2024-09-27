// components/posts/columns.tsx
'use client';

import { Button } from '@/components/ui/button';
import type { ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';

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

      // Function to handle the delete action
      const handleDelete = async () => {
        const confirmed = confirm('Are you sure you want to delete this post?');
        if (!confirmed) return;

        try {
          const response = await fetch(
            `http://localhost:3000/api/v1/post/${postId}`,
            {
              method: 'DELETE',
            },
          );

          if (response.ok) {
            toast.success('Post deleted successfully!', {
              position: 'top-center',
              duration: 3000,
            });
            window.location.reload();
          } else {
            const errorData = await response.json();
            toast.error('Error', {
              description: errorData.message || 'Failed to delete post',
              position: 'bottom-right',
              duration: 5000,
            });
          }
        } catch (error) {
          toast.error('An unexpected error occurred.', {
            description: 'Please try again later.',
            position: 'bottom-left',
            duration: 5000,
          });
        }
      };

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
          <Button variant='destructive' size='sm' onClick={handleDelete}>
            Delete
          </Button>
        </div>
      );
    },
  },
];
