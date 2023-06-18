import AnyView from 'components/views/AnyView';
import App from '../App';
import { createBrowserRouter } from 'react-router-dom';
import PostBoard from 'components/views/PostBoard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <PostBoard /> },
      {
        path: '/:view',
        element: <AnyView />,
      },
    ],
  },
]);

export default router;
