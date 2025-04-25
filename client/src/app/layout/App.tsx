import { Box, Container, CssBaseline } from '@mui/material';

import NavBar from './NavBar';
import { Outlet } from 'react-router';

export default function App() {

  return (
    <Box sx={{ backgroundColor: '#eeeeee', minHeight: '100vh' }}>
      <CssBaseline />
      <NavBar />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Outlet />
      </Container>
    </Box>
  );
}
