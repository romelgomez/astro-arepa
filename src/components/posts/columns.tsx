// components/posts/columns.tsx
'use client';

import { Button } from '@/components/ui/button';
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
        </div>
      );
    },
  },
];
