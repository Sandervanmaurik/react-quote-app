import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import './styles/variables.scss';
import VisitorContextProvider from './contexts/visitorContext';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <VisitorContextProvider>
      <App />
    </VisitorContextProvider>
  </React.StrictMode>
);
