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
const container = document.getElementById('root');
if (!container) throw new Error('Root element #root not found');

createRoot(container).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
);
