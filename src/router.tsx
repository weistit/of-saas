import { createBrowserRouter } from 'react-router-dom';
import App from './App';

export const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/auth', element: <App /> },
  { path: '/dashboard', element: <App /> },
  { path: '/email-management', element: <App /> },
  { path: '/content-business', element: <App /> },
  { path: '/settings', element: <App /> },
]);

export default router;
