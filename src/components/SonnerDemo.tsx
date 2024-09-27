import { toast } from 'sonner';
import { Button } from './ui/button';

export function SonnerDemo() {
  // Normal toast
  const showNormalToast = () => {
    toast('Hello World!', {
      description: 'This is a normal toast message.',
      position: 'top-center',
      duration: 4000,
    });
  };

  // Success toast
  const showSuccessToast = () => {
    toast.success('Success!', {
      description: 'Your data was saved successfully.',
      position: 'top-right',
      duration: 5000,
      style: { backgroundColor: '#d4edda', color: '#155724' },
    });
  };

  // Info toast
  const showInfoToast = () => {
    toast.info('New Update', {
      description: 'A new version is available for download.',
      position: 'bottom-left',
      duration: 6000,
      style: { backgroundColor: '#cce5ff', color: '#004085' },
    });
  };

  // Warning toast
  const showWarningToast = () => {
    toast.warning('Warning!', {
      description: 'Your session will expire in 2 minutes.',
      position: 'bottom-center',
      duration: 7000,
      style: { backgroundColor: '#fff3cd', color: '#856404' },
    });
  };

  // Error toast
  const showErrorToast = () => {
    toast.error('Error Occurred', {
      description: 'Unable to connect to the server.',
      position: 'bottom-right',
      duration: 8000,
      style: { backgroundColor: '#f8d7da', color: '#721c24' },
    });
  };

  // Loading toast
  const showLoadingToast = () => {
    toast.loading('Loading...', {
      description: 'Fetching your data...',
      position: 'top-left',
      duration: 10000,
    });
  };

  // Action toast
  const showActionToast = () => {
    toast('Item added to cart', {
      description: 'Click "Undo" if this was a mistake.',
      position: 'top-right',
      action: {
        label: 'Undo',
        onClick: () => console.log('Undo action clicked'),
      },
      duration: 6000,
    });
  };

  // Custom JSX toast
  const showCustomToast = () => {
    toast.custom(
      (id) => (
        <div
          style={{
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
            color: '#333',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <strong>Custom Notification</strong>
          <p>This is a custom toast with JSX content.</p>
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button
            style={{
              padding: '5px 10px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
            onClick={() => toast.dismiss(id)}
          >
            Dismiss
          </button>
        </div>
      ),
      { position: 'top-center', duration: 9000 },
    );
  };

  // Promise-based toast
  const showPromiseToast = () => {
    const fetchData = new Promise((resolve) =>
      setTimeout(() => resolve('Data loaded successfully'), 3000),
    );

    toast.promise(fetchData, {
      loading: 'Loading data...',
      success: (data) => `Success: ${data}`,
      error: 'Failed to load data.',
      position: 'bottom-left',
      duration: 5000,
    });
  };

  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      <Button variant='outline' onClick={showNormalToast}>
        Normal Toast
      </Button>
      <Button variant='outline' onClick={showSuccessToast}>
        Success Toast
      </Button>
      <Button variant='outline' onClick={showInfoToast}>
        Info Toast
      </Button>
      <Button variant='outline' onClick={showWarningToast}>
        Warning Toast
      </Button>
      <Button variant='outline' onClick={showErrorToast}>
        Error Toast
      </Button>
      <Button variant='outline' onClick={showLoadingToast}>
        Loading Toast
      </Button>
      <Button variant='outline' onClick={showActionToast}>
        Action Toast
      </Button>
      <Button variant='outline' onClick={showCustomToast}>
        Custom Toast
      </Button>
      <Button variant='outline' onClick={showPromiseToast}>
        Promise Toast
      </Button>
    </div>
  );
}
