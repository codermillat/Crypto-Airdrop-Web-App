import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Improved error handling with type safety
const Root = () => {
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    const handleError = (error: Error | any) => {
      setError(error);
      console.error('Unhandled error:', error);
    };

    window.onerror = handleError;
    window.onunhandledrejection = (event: PromiseRejectionEvent) => handleError(event.reason);

    return () => {
      window.onerror = null;
      window.onunhandledrejection = null;
    };
  }, []);

  if (error) {
    return (
      <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>
        <h1>An error occurred:</h1>
        <pre>{error.message || 'An unknown error occurred'}</pre>
        <p>Please check the console for more details.</p>
      </div>
    );
  }

  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(<Root />);
