/* eslint-disable no-nested-ternary */
// @mui
import { Alert, Tooltip, Stack, Typography, Link, Box } from '@mui/material';
// auth
import { pxToRem } from 'src/theme/typography';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LoginLayout from 'src/layouts/login/LoginLayout';
import AuthLoginForm from 'src/sections/auth/AuthLoginForm';
import GuestGuard from 'src/auth/GuestGuard';
import { useAuthContext } from '../../auth/useAuthContext';
// layouts

// ----------------------------------------------------------------------

export default function Login() {
  const { method } = useAuthContext();
  const router = useRouter();
  const { query, pathname } = router;

  return (
    <GuestGuard>
      <LoginLayout>
        <Box
          sx={{
            padding: 4,
            boxShadow: 4,
          }}
          borderRadius="12px"
          bgcolor="rgba(255, 255, 255, 0.71)"
        >
          <Stack spacing={2} sx={{ mb: 2, position: 'relative' }}>
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
                  // fontFamily: 'Outfit',
                  color: '#1C2F41',
                  fontSize: pxToRem(40),
                }}
              >
                {query?.role == '2'
                  ? 'Employer Login'
                  : query?.role == '3'
                    ? 'Candidate Login'
                    : pathname === '/super-admin/login'
                      ? 'Admin Login'
                      : 'Login'}
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
    </GuestGuard>
  );
}
