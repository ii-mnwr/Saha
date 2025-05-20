import React, { useState } from 'react';
import { useAuthContext } from 'src/auth/useAuthContext';
import { Box, Divider, Typography } from '@mui/material';
import { useSettingsContext } from 'src/components/settings';
import useResponsive from 'src/hooks/useResponsive';
import UserHeader from '../dashboard/header/Header';
import Main from '../dashboard/Main';
import NavVertical from '../dashboard/nav/NavVertical';
import AuthGuard from 'src/auth/AuthGuard';

type Props = {
  children?: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const { user } = useAuthContext();

  const { themeLayout } = useSettingsContext();

  const isDesktop = useResponsive('up', 'lg');

  const [open, setOpen] = useState(false);

  const isNavHorizontal = themeLayout === 'horizontal';

  const isNavMini = themeLayout === 'mini';
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderNavVertical = <NavVertical openNav={open} onCloseNav={handleClose} />;

  const renderContent = () => (
    <>
      <UserHeader onOpenNav={handleOpen} />

      <Box
        sx={{
          display: { lg: 'flex' },
          minHeight: { lg: 1 },
        }}
      >
        {!isDesktop && renderNavVertical}

        <Box width="100%">{children}</Box>
      </Box>
      {/* <Footer /> */}
    </>
  );
  return <AuthGuard>{renderContent()}</AuthGuard>;
};

export default Layout;
