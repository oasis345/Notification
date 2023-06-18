import Navbar from './components/Navbar';
import './App.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { registry } from '@common/registry';
import { useEffect } from 'react';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
import { useMediaQuery } from '@mui/material';

function App() {
  const navigate = useNavigate();
  const { uiService, notificationService } = registry;
  const isMobile = useMediaQuery('(max-width: 600px)');
  uiService.isMobile = isMobile;

  useEffect(() => {
    uiService.notify = enqueueSnackbar;
    uiService.go = navigate;

    window.addEventListener('beforeunload', (event) => {
      event.preventDefault();
      notificationService.close();
    });
  }, [navigate, notificationService, uiService]);

  return (
    <SnackbarProvider maxSnack={3}>
      <div className="main_layout">
        <div className="header">
          <Navbar />
        </div>

        <div className="main">
          <Outlet />
        </div>
        <div className="left_side"></div>
        <div className="right_side"></div>
      </div>
    </SnackbarProvider>
  );
}

export default App;
