// @mui
import { Stack, Box } from '@mui/material';
// config
import { useAuthContext } from 'src/auth/useAuthContext';
import { useRouter } from 'next/router';
import { NAV } from '../../../config-global';
// utils
import { hideScrollbarX } from '../../../utils/cssStyles';
// components
import Logo from '../../../components/logo';
import { NavSectionMini } from '../../../components/nav-section';
//
import { navConfig, candidateNavbar, NavItems, superAdminNavbar } from './config-navigation';
// import NavToggleButton from './NavToggleButton';

// ----------------------------------------------------------------------

export default function NavMini() {
  const { user } = useAuthContext();
  const { pathname } = useRouter();

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        // width: { lg: NAV.W_DASHBOARD_MINI },
      }}
    >
      {/* <NavToggleButton
        sx={{
          top: 22,
          left: NAV.W_DASHBOARD_MINI - 12,
        }}
      />

      <Stack
        sx={{
          pb: 2,
          height: 1,
          position: 'fixed',
          width: NAV.W_DASHBOARD_MINI,
          background: '#fff',
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          ...hideScrollbarX,
        }}
      >
        <Logo sx={{ mx: 'auto', my: 2 }} />

        <NavSectionMini
          data={
            user && user.role_id === 3 && !['/', '/about-us', '/contact-us']?.includes(pathname)
              ? candidateNavbar
              :
              user && user.role_id === 2 && !['/', '/about-us', '/contact-us']?.includes(pathname)
                ? navConfig
                : user && user?.role_id === 1
                  ? superAdminNavbar
                  : NavItems()
          }
        />
      </Stack> */}
    </Box>
  );
}