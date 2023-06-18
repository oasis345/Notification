import logo from '../assets/logo.png';
import Button from '@mui/material/Button';
import { registry } from '@common/registry';
import { observer } from 'mobx-react';
import { IconButton } from '@mui/material';
import Settings from '@mui/icons-material/Settings';

const Navbar = observer(() => {
  const { authService, uiService } = registry;

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        background: 'white',
        top: '0',
        padding: '1rem',
        position: 'fixed',
        boxSizing: 'border-box',
        zIndex: 1000,
      }}
    >
      <img src={logo} width={140} height={40} onClick={() => uiService.go('/')} style={{ cursor: 'pointer' }} />
      <div>
        {!authService.user && (
          <Button
            variant="text"
            sx={{ width: '80px' }}
            color="success"
            size="medium"
            onClick={() => uiService.go('/Login')}
          >
            로그인
          </Button>
        )}
        {authService.user && (
          <div style={{ display: 'flex' }}>
            <Button
              variant="text"
              sx={{ width: '80px' }}
              color="success"
              size="medium"
              onClick={() => uiService.go('/PostForm')}
            >
              판매
            </Button>

            <Button
              variant="text"
              sx={{ width: '80px' }}
              color="success"
              size="medium"
              onClick={() => authService.signOut()}
            >
              로그 아웃
            </Button>
            <IconButton onClick={() => uiService.go('/SetupList')}>
              <Settings />
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
});

export default Navbar;
