import { TextField, Button } from '@mui/material';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { registry } from '@common/registry';

export default function Login() {
  const { authService, uiService } = registry;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitted = async (event: React.FormEvent) => {
    event.preventDefault();

    const result = await authService.signIn(email, password);
    if (result) uiService.go('/');
  };

  return (
    <>
      <h1>로그인</h1>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1 },
        }}
        onSubmit={onSubmitted}
      >
        <TextField
          name="title"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label={'이메일'}
        ></TextField>

        <TextField
          name="password"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label={'비밀번호'}
        ></TextField>

        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <Button variant="outlined" type="submit">
            로그인
          </Button>
        </div>
      </Box>
    </>
  );
}
