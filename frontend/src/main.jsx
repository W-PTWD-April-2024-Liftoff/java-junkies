import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Auth0Provider} from '@auth0/auth0-react';


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Auth0Provider
  domain="dev-ctjnz7bwztjyeaho.us.auth0.com"
  clientId='HrQCeCph03R9clb80eGRfM3TQ9JYD2TK'
  authorizationParams={{
    redirect_uri: window.location.origin
  }}
  >
    <App />
  </Auth0Provider>
  </StrictMode>
)

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
