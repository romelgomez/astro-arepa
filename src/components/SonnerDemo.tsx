import React from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';

export function SonnerDemo() {
  const toastHandler = () => {
    console.log('sonner demo ~ 001');

    toast('Event has been created', {
      description: 'Sunday, December 03, 2023 at 9:00 AM',
      action: {
        label: 'Undo',
        onClick: () => console.log('Undo'),
      },
    });
  };

  return (
    <Button variant='outline' onClick={toastHandler}>
      Show Toast
    </Button>
  );
}
