import { useState } from 'react';
// @mui
import { Box, Divider, Typography } from '@mui/material';
// hooks
import Iconify from 'src/components/iconify/Iconify';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useAuthContext } from 'src/auth/useAuthContext';
import useResponsive from '../../hooks/useResponsive';
// auth
import AuthGuard from '../../auth/AuthGuard';
// components
import { useSettingsContext } from '../../components/settings';
//
import Main from './Main';
import Header from './header';
import NavMini from './nav/NavMini';
import NavVertical from './nav/NavVertical';
import NavHorizontal from './nav/NavHorizontal';
import Footer from './footer';

// ----------------------------------------------------------------------

type Props = {
  children?: React.ReactNode;
  links?: any;
  title?: string;
};

export default function DashboardLayout({ children, links, title }: Props) {
  const { themeLayout } = useSettingsContext();

  // const isDesktop = useResponsive('up', 'lg');

  const [open, setOpen] = useState(false);

  // const isNavHorizontal = themeLayout === 'horizontal';

  // const isNavMini = themeLayout === 'mini';

  const { user } = useAuthContext();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderNavVertical = <NavVertical openNav={open} onCloseNav={handleClose} />;

  const renderContent = () => {
    // if (isNavHorizontal) {
    //   return (
    //     <>
    //       <Header onOpenNav={handleOpen} />

    //       {isDesktop ? <NavHorizontal /> : renderNavVertical}

    //       <Main>{children}</Main>
    //       {/* <Footer /> */}
    //     </>
    //   );
    // }

    // if (isNavMini) {
    //   return (
    //     <>
    //       <Header onOpenNav={handleOpen} />

    //       <Box
    //         sx={{
    //           display: { lg: 'flex' },
    //           minHeight: { lg: 1 },
    //         }}
    //       >
    //         {isDesktop ? <NavMini /> : renderNavVertical}

    //         <Main>{children}</Main>
    //       </Box>
    //       {/* <Footer /> */}
    //     </>
    //   );
    // }

    return (
      <>
        <Header onOpenNav={handleOpen} />

        <Box
          sx={{
            display: { lg: 'flex' },
            minHeight: { lg: 1 },
          }}
        >
          {user && renderNavVertical}

          <Main>
            <>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                paddingX={{ xs: 3, xl: 4 }}
                pb={3}
                mt={-10}
              >
                <Typography
                  sx={{
                    fontFamily: 'Archivio,sans-serif',
                    fontWeight: 600,
                    fontSize: 32,
                    color: '#0a2239',
                  }}
                >
                  {title || `Welcome ${user?.user_name}!`}
                </Typography>
                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  sx={{
                    borderColor: '#000',
                    borderWidth: 1,
                    marginX: 1.5,
                  }}
                />
                <CustomBreadcrumbs links={links} />
              </Box>
              {children}
            </>
          </Main>
        </Box>
        {/* <Footer /> */}
      </>
    );
  };
  // return renderContent(); // need to replace with below code, once we got the apis
  return <AuthGuard> {renderContent()} </AuthGuard>;
}
