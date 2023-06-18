import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { registerServices } from './services/service.factory';
import router from 'routes';

(async () => {
  await registerServices();

  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<RouterProvider router={router} />);
})();
