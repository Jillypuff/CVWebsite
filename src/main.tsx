// src/main.tsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import App from './pages/App.tsx';
import About from './components/About.tsx';
import WorkInProgress from './components/WorkInProgress.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404</div>,
    children: [
      {
        index: true,
        element: <About />
      },
      {
        path: "expertise",
        element: <WorkInProgress />
      },
      {
        path: "projects",
        element: <WorkInProgress />
      },
      {
        path: "contact",
        element: <WorkInProgress />
      },
      {
        path: "about",
        element: <WorkInProgress />
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
