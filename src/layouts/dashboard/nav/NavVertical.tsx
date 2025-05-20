import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { Box, Stack, Drawer } from '@mui/material';
// hooks
import { useAuthContext } from 'src/auth/useAuthContext';
import { useGetAllFeedbacks } from 'src/hooks/useFeedback';
import useResponsive from '../../../hooks/useResponsive';
// config
import { NAV } from '../../../config-global';
// components
import Logo from '../../../components/logo';
import Scrollbar from '../../../components/scrollbar';
import { NavSectionVertical } from '../../../components/nav-section';
//
import {
  navConfig,
  candidateNavbar,
  navItems,
  NavItems,
  superAdminNavbar,
  candidateNavbar2,
} from './config-navigation';
import NavDocs from './NavDocs';
import NavAccount from './NavAccount';
// import NavToggleButton from './NavToggleButton';

// ----------------------------------------------------------------------

type Props = {
  openNav: boolean;
  onCloseNav: VoidFunction;
};

export default function NavVertical({ openNav, onCloseNav }: Props) {
  const { pathname } = useRouter();
  const { user } = useAuthContext();
  const isDesktop = useResponsive('up', 'lg');

  const { isFeedbackSent } = useGetAllFeedbacks();
  console.log(
    'isFeedbackSent',
    candidateNavbar[0]?.items?.filter((item) => item?.title !== 'Feedback')
  );

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        // height: 1,
        // '& .simplebar-content': {
        //   height: 1,
        //   display: 'flex',
        //   flexDirection: 'column',
        // },
      }}
    >
      <Stack
        // spacing={3}
        // sx={{
        //   pt: 1.5,
        //   pb: 2,
        //   // px: 2.5,
        //   flexShrink: 0,
        //   background: 'transparent',
        //   height: 70,
        // }}
      >
        {/* <NavAccount /> */}
      </Stack>

      {/* <NavSectionVertical
        data={
          user &&
          user.role_id === 3 &&
          !['/', '/about-us', '/contact-us', '/category/[slug]'].includes(pathname)
            ? isFeedbackSent?.data?.isSent === true
              ? candidateNavbar2 // Fixed !===
              : candidateNavbar
            : user &&
                user.role_id === 2 &&
                !['/', '/about-us', '/contact-us', '/category/[slug]'].includes(pathname)
              ? navConfig
              : user && user?.role_id === 1
                ? superAdminNavbar
                : NavItems()
        }
      /> */}

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        // flexShrink: { lg: 0 },
        // width: { lg: NAV.W_DASHBOARD },
      }}
    >
      {/* <NavToggleButton /> */}

      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              zIndex: 0,
              width: NAV.W_DASHBOARD,
              bgcolor: 'transparent',
              border: 'none',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              width: NAV.W_DASHBOARD,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}