import React from 'react';
import ReactDOM from 'react-dom/client';

import Home from './components/Home';
import Dash from './components/Dash';
import './global-styles.css'

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
    ,
  },
  {
    path: '/dash',
    element: <Dash />,
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
