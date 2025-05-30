import { memo } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { AppBar, Box, BoxProps, Toolbar } from '@mui/material';
// config
import { useAuthContext } from 'src/auth/useAuthContext';
import { HEADER } from '../../../config-global';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// components
import { NavSectionHorizontal } from '../../../components/nav-section';
//
import { navConfig, candidateNavbar, NavItems, superAdminNavbar } from './config-navigation';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

function NavHorizontal() {
  const theme = useTheme();
  const { user } = useAuthContext();
  const { pathname } = useRouter();
  console.log('user', user);

  return (
    <AppBar
      component="nav"
      color="transparent"
      sx={{
        boxShadow: 0,
        top: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
      }}
    >
      <Toolbar
        sx={{
          ...bgBlur({
            color: theme.palette.background.default,
          }),
        }}
      >
        <NavSectionHorizontal
          data={
            user && user.role_id === 3 && !['/', '/about-us', '/contact-us']?.includes(pathname)
              ? candidateNavbar
              : user && user.role_id === 2 && !['/', '/about-us', '/contact-us']?.includes(pathname)
                ? navConfig
                : user && user?.role_id === 1
                  ? superAdminNavbar
                  : NavItems()
          }
        />
      </Toolbar>

      <Shadow />
    </AppBar>
  );
}

export default memo(NavHorizontal);

// ----------------------------------------------------------------------

function Shadow({ sx, ...other }: BoxProps) {
  return (
    <Box
      sx={{
        left: 0,
        right: 0,
        bottom: 0,
        height: 24,
        zIndex: -1,
        width: 1,
        m: 'auto',
        borderRadius: '50%',
        position: 'absolute',
        boxShadow: (theme) => theme.customShadows.z8,
        ...sx,
      }}
      {...other}
    />
  );
}
