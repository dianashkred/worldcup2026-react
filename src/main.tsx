import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react'
import App from './App.tsx'
import { Provider } from 'react-redux';
import { store } from './features/store';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>
);