import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Auth0Provider} from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
  <Auth0Provider
  domain="dev-ctjnz7bwztjyeaho.us.auth0.com"
  clientId='HrQCeCph03R9clb80eGRfM3TQ9JYD2TK'
  authorizationParams={{
    redirect_uri: window.location.origin,
    scope: 'openid profile email read:posts create:posts read:profile create:profile update:profile update:posts upload:photo write:posts delete:posts',
    audience: 'https://intheloop-auth0api.com',
  }}

  onRedirectCallback={(appState) => {
    window.history.replaceState(
      {},
      document.title,
      appState?.returnTo || '/posts'
    );
  }}
  >
    <App />
  </Auth0Provider>
  </BrowserRouter>
  </StrictMode>
)