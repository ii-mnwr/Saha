/* eslint-disable no-nested-ternary */
// @mui
import { useTheme } from '@mui/material/styles';
import { AppBar, Toolbar, Box, BoxProps, Link, Typography, Button, MenuItem } from '@mui/material';
// config
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import MenuPopover from 'src/components/menu-popover/MenuPopover';
import { useState } from 'react';
import { headerMenu } from 'src/utils/constData';
import useScreenSizes from 'src/hooks/useScreenSizes';
import MenuIcon from '@mui/icons-material/Menu';
import { HEADER } from '../../config-global';
// utils
import { bgBlur } from '../../utils/cssStyles';
// components
import Logo from '../../components/logo';
// ----------------------------------------------------------------------

type Props = {
  isOffset: boolean;
};

export default function Header({ isOffset }: Props) {
  const theme = useTheme();
  const { isMobile, isTablet, isLaptop, isLaptopL, isMobileM, isMobileL } = useScreenSizes();

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <AppBar color="transparent" sx={{ boxShadow: 0 }}>
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_MAIN_DESKTOP,
          },
          transition: theme.transitions.create(['height', 'background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(isOffset && {
            ...bgBlur({ color: 'rgba(3, 19, 60, 0.8)' }),
            height: {
              md: HEADER.H_MAIN_DESKTOP - 16,
            },
          }),
        }}
      >
        {isTablet || isMobileL || isMobileM || isMobile ? (
          <>
            <MenuIcon />
            <Logo />
          </>
        ) : (
          <>
            <Logo />
            <Box display="flex" width="100%" ml={10} gap={4}>
              <Link href="/" underline="none" color="#85B6FF">
                Home
              </Link>
              {/* <Link href="/" underline="none" color="#6D88C2">
                Employer
              </Link>
              <Link href="/" underline="none" color="#6D88C2">
                Candidates
              </Link> */}
              <Link href="/about-us" underline="none" color="#6D88C2">
                About
              </Link>
              <Link href="/contact-us" underline="none" color="#6D88C2">
                Contact
              </Link>
            </Box>
            <Button
              variant="outlined"
              onClick={handleOpenPopover}
              sx={{
                width: isTablet ? 500 : isMobileL ? 200 : 300,
                border: 0,
                outline: 0,
                '&:hover': {
                  border: 0,
                  bgcolor: 'transparent',
                },
              }}
            >
              <PersonAddOutlinedIcon htmlColor="#6D88C2" sx={{ width: 20 }} />
              <Typography marginLeft={1} color="#6D88C2" variant="body2">
                Login / Sing up
              </Typography>
            </Button>
            <MenuPopover
              open={openPopover}
              disabledArrow
              onClose={handleClosePopover}
              sx={{ bgcolor: 'rgba(3, 19, 60, 0.75)', marginTop: '18px', borderRadius: 0 }}
            >
              {headerMenu?.map((userItem, index) => (
                <MenuItem key={index}>
                  <Link href={userItem?.link} display="flex" underline="none">
                    <img src={userItem?.icon} alt={userItem?.icon} width={18} height={18} />
                    <Typography variant="body2" color="#6D88C2" ml={2}>
                      {userItem?.title}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </MenuPopover>
          </>
        )}
      </Toolbar>

      {isOffset && <Shadow />}
    </AppBar>
  );
}

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
        m: 'auto',
        borderRadius: '50%',
        position: 'absolute',
        width: `calc(100% - 48px)`,
        boxShadow: (theme) => theme.customShadows.z8,
        ...sx,
      }}
      {...other}
    />
  );
}
