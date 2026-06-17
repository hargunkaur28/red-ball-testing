import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// After a new Vercel deployment, old chunk filenames no longer exist on the CDN.
// Browsers that cached the previous page shell will try to load stale chunk URLs
// and get a 404. Vite fires `vite:preloadError` in that case — reloading once
// fetches the fresh entry-point and resolves the stale references.
window.addEventListener('vite:preloadError', () => {
  window.location.reload();
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
