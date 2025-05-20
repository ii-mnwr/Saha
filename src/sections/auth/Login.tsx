/* eslint-disable no-nested-ternary */
// @mui
import { Alert, Tooltip, Stack, Typography, Link, Box } from '@mui/material';
// auth
import { pxToRem } from 'src/theme/typography';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from '../../auth/useAuthContext';
// layouts
import LoginLayout from '../../layouts/login';
//
import AuthLoginForm from './AuthLoginForm';
import AuthWithSocial from './AuthWithSocial';
import LoginAsModal from './LoginAsModal';



// ----------------------------------------------------------------------

export default function Login() {
  const { method } = useAuthContext();
  const router = useRouter();
  const { query } = router;

  return (
    <LoginLayout>
      <Box
        sx={{
          alignItems: 'center',
          padding: 4,
          width: { xs: '300px', sm: '400px', md: '400px', lg: '400px', xl: '400px' },
          height: 'auto',
        }}
        borderRadius="12px"
        bgcolor="#eee"
      >
        <Stack spacing={2} sx={{ mb: 0, position: 'center' }}>
          <Box
            width="100%"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            display="flex"
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontFamily: 'Archivo, sans-serif',
                color: '#0a2239',
                fontSize: pxToRem(34),
              }}
            >
              {query?.role == '2' ? 'Login' : query?.role == '3' ? 'Login' : 'Login'}
            </Typography>
            {/* <Typography
              sx={{
                fontWeight: 600,
                // fontFamily: 'Outfit',
                color: '#0083FF',
                fontSize: pxToRem(40),
              }}
            >
              Talents Reach
            </Typography> */}
          </Box>
        </Stack>

        <AuthLoginForm />
      </Box>
    </LoginLayout>
  );
}
