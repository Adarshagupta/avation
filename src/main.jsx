import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import BlogPage from './pages/Blog.jsx'
import ClassesPage from './pages/Classes.jsx'
import AboutPage from './pages/About.jsx'
import TestimonialsPage from './pages/Testimonials.jsx'
import ContactPage from './pages/Contact.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/blog",
    element: <BlogPage />,
  },
  {
    path: "/classes",
    element: <ClassesPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/testimonials",
    element: <TestimonialsPage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
