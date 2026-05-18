import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { App } from './App';
import './index.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#020617',
            color: '#e2e8f0',
            border: '1px solid #1e293b',
            borderRadius: '16px'
          },
          success: {
            style: {
              border: '1px solid rgba(34, 197, 94, 0.3)'
            }
          },
          error: {
            style: {
              border: '1px solid rgba(244, 63, 94, 0.3)'
            }
          }
        }}
      />
    </BrowserRouter>
  </StrictMode>
);
