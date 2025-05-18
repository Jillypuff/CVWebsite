import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import App from './pages/App.tsx';
// import WorkInProgress from './pages/WorkInProgress.tsx';
import About from './pages/About.tsx';
import Projects from './pages/Projects.tsx';
import Contact from './pages/Contact.tsx';

import Home from './components/Home.tsx';
import Resume from './pages/Resume.tsx';

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
        element: <About />
      },
      {
        path: "resume",
        element: <Resume />
      },
      {
        path: "projects",
        element: <Projects />
      },
      {
        path: "contact",
        element: <Contact />
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
