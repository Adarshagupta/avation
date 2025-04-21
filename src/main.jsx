import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import BlogPage from './pages/Blog.jsx'
import ClassesPage from './pages/Classes.jsx'
import AboutPage from './pages/About.jsx'
import NetworkPage from './pages/Network.jsx'
import ContactPage from './pages/Contact.jsx'
import BookingPage from './pages/Booking.jsx'

// Use basename to ensure routing works correctly in all environments
const router = createBrowserRouter(
  [
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
      path: "/network",
      element: <NetworkPage />,
    },
    {
      path: "/contact",
      element: <ContactPage />,
    },
    {
      path: "/booking",
      element: <BookingPage />,
    }
  ],
  {
    basename: '/',
  }
);

// Log routing for debugging
console.log('Router initialized with routes:', router.routes.map(r => r.path));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
