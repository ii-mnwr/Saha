import { useState, useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { List, Drawer, IconButton } from '@mui/material';
// config
import { NavSectionVertical } from 'src/components/nav-section';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useGetAllFeedbacks } from 'src/hooks/useFeedback';
import {
  candidateNavbar,
  candidateNavbar2,
  navConfig,
  NavItems,
  superAdminNavbar,
} from 'src/layouts/dashboard/nav/config-navigation';
import { NAV } from '../../../../config-global';
// components
import Logo from '../../../../components/logo';
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';
//
import { NavProps } from '../types';
import NavList from './NavList';

// ----------------------------------------------------------------------

export default function NavMobile({ isOffset, data }: NavProps) {
  const { pathname } = useRouter();
  const { user } = useAuthContext();

  const { isFeedbackSent } = useGetAllFeedbacks();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* <Drawer
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            pb: 5,
            width: NAV.W_BASE,
          },
        }}
      >
        <Scrollbar>
          <Logo sx={{ mx: 2.5, my: 3 }} />

          <List component="nav" disablePadding>
            <NavSectionVertical
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
              sx={{
              '& .MuiList-root:last-of-type .MuiListItemButton-root': {
                height: 160,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                bgcolor: 'background.neutral',
                backgroundRepeat: 'no-repeat',
                backgroundImage: 'url(/assets/illustrations/illustration_dashboard.png)',
                '& > *:not(.MuiTouchRipple-root)': { display: 'none' },
              },
            }}
            />
          </List>
        </Scrollbar>
      </Drawer>
      {user && (
        <IconButton
          onClick={handleOpen}
          sx={{
            ml: 1,
            ...(isOffset && {
              color: 'text.primary',
            }),
          }}
        >
          <Iconify
            icon="eva:menu-2-fill"
            sx={{
              color: '#85B6FF',
            }}
          />
        </IconButton>
      )} */}
    </>
  );
}