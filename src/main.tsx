import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './styles/globals.css';

/**
 * HashRouter is used instead of BrowserRouter because the app is served from
 * GitHub Pages, a static host with no rewrite rules: a deep link such as
 * /Final_Project/charts would 404 on refresh. With hash routing the entry
 * document always loads and the router resolves the path client-side.
 */
/**
 * A path-style link such as /about reaches the static host before the router
 * ever runs, and HashRouter then renders the home route because the hash is
 * empty. Vercel serves index.html for those paths, so rewrite them into the
 * equivalent hash route before mounting. Without this, every shared
 * non-hash URL silently showed the homepage instead of its page.
 */
const deepPath = window.location.pathname.replace(/^\/Final_Project/, '');
if (!window.location.hash && deepPath && deepPath !== '/') {
  window.location.replace(`/#${deepPath}${window.location.search}`);
}

const container = document.getElementById('root');
if (!container) throw new Error('Root element #root not found');

createRoot(container).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
);
