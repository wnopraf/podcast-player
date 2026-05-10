import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorBoundary } from '../components/ErrorBoundary';
import App from '../../App';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    ),
    // TODO: Add child routes when components are created
    // children: [
    //   {
    //     index: true,
    //     element: <PodcastsList />,
    //   },
    //   {
    //     path: 'podcast/:id',
    //     element: <PodcastDetail />,
    //   },
    // ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
