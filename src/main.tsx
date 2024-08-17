import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider
    clientId={process.env.googleClientID ?? " "}
    >
    <StrictMode>
      <App />
    </StrictMode>
  </GoogleOAuthProvider>
)
