import Button from '@mui/material/Button';
import { registry } from '@common/registry';
import { observer } from 'mobx-react';
import { AppBar, Box, Container, IconButton, Toolbar } from '@mui/material';
import Settings from '@mui/icons-material/Settings';

const Navbar = observer(() => {
  const { authService, uiService } = registry;

  return (
    <AppBar>
      <Container>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
            <Button sx={{ my: 2, color: 'white' }} onClick={() => uiService.go('/')}>
              Home
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {!authService.user && (
              <>
                <Button sx={{ color: 'white' }} onClick={() => uiService.go('/SignIn')}>
                  로그인
                </Button>
                <Button sx={{ color: 'white' }} onClick={() => uiService.go('/SignUp')}>
                  회원 가입
                </Button>
              </>
            )}
            {authService.user && (
              <>
                <Button sx={{ color: 'white' }} size="medium" onClick={() => uiService.go('/Form')}>
                  판매
                </Button>

                <Button sx={{ color: '#fff' }} size="medium" onClick={() => authService.signOut()}>
                  로그 아웃
                </Button>
                <IconButton onClick={() => uiService.go('/SetupList')}>
                  <Settings />
                </IconButton>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
});

export default Navbar;
