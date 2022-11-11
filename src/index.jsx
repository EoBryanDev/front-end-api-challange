import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  createBrowserRouter,
  RouterProvider,
  } from 'react-router-dom';
  
import Home from './components/Home';
import Dash from './components/Dash';
import ErrorBoundary from './components/Error Bondary';
import './global-styles.css'







const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
    ,
  },
  {
    path: '/dash',
    element: <Dash />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/*',
    element: <Home />,
  },
  
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
