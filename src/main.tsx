import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import App from './pages/App.tsx';
import WorkInProgress from './components/WorkInProgress.tsx';

import Home from './components/Home.tsx';
import Resume from './components/Resume.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404</div>,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "about",
        element: <WorkInProgress />
      },
      {
        path: "/resume",
        element: <Resume />
      },
      {
        path: "projects",
        element: <WorkInProgress />
      },
      {
        path: "contact",
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
