import { Outlet } from 'react-router-dom';
import { Global } from '@emotion/react';
import reset from './styles/reset';
import Header from './components/Header';

function App() {
  return (
    <>
      <Global styles={reset} />
      <Header />
      <Outlet />
    </>
  );
}

export default App;
