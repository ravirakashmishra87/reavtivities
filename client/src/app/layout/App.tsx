import { Box, Container, CssBaseline } from '@mui/material';

import NavBar from './NavBar';
import { Outlet, useLocation } from 'react-router';
import HomePage from '../../features/activities/home/HomePage';

export default function App() {

  const location = useLocation();

  return (
    <Box sx={{ backgroundColor: '#eeeeee', minHeight: '100vh' }}>
      <CssBaseline />
      {location.pathname === '/' ? <HomePage /> : (
        <>
          <NavBar />
          <Container maxWidth="xl" sx={{ mt: 3 }}>
            <Outlet />
          </Container>
        </>
      )}

    </Box>
  );
}
