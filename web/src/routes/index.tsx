import AnyView from 'components/views/AnyView';
import App from '../App';
import { createBrowserRouter } from 'react-router-dom';
import { Home } from 'components/views/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      {
        path: '/:view',
        element: <AnyView />,
      },
    ],
  },
]);

export default router;
