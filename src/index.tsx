import React from 'react';
import ReactDOM from 'react-dom';
import { Toaster } from 'react-hot-toast';

import App from './App';
import { ThemeContextProvider } from './contexts/ThemeContext';

import './services/firebase';

import './styles/global.scss';

ReactDOM.render(
  <React.StrictMode>
    <div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>

    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
