import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Main from './pages';
import KeepJournal from './pages/KeepJournal';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Main /> },
      { path: '/keep', element: <KeepJournal /> },
    ],
  },
]);

export default router;
