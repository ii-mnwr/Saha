/* eslint-disable no-nested-ternary */
import { forwardRef } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Link, BoxProps, Typography } from '@mui/material';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useSettingsContext } from '../settings';
import SVGLogo from './SVGLogo';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref) => {
    const theme = useTheme();
    const { themeLayout, currentTargetPage } = useSettingsContext();
    const { user } = useAuthContext();
    const isNavMini = themeLayout === 'mini';

    const PRIMARY_LIGHT = theme.palette.primary.light;

    const PRIMARY_MAIN = theme.palette.primary.main;

    const PRIMARY_DARK = theme.palette.primary.dark;

    // OR using local (public folder)
    // -------------------------------------------------------
    // const logo = (
    //   <Box
    //     component="img"
    //     src="/logo/logo_single.svg" => your path
    //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
    //   />
    // );

    const logo = (
      <Box
        ref={ref}
        component="div"
        sx={{
          width: 200,
          height: 42,
          // marginLeft: 10,
          display: 'inline-flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1,
          ...sx,
        }}
        {...other}
      >
        {/* <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 512 512">
          <defs>
            <linearGradient id="BG1" x1="100%" x2="50%" y1="9.946%" y2="50%">
              <stop offset="0%" stopColor={PRIMARY_DARK} />
              <stop offset="100%" stopColor={PRIMARY_MAIN} />
            </linearGradient>

            <linearGradient id="BG2" x1="50%" x2="50%" y1="0%" y2="100%">
              <stop offset="0%" stopColor={PRIMARY_LIGHT} />
              <stop offset="100%" stopColor={PRIMARY_MAIN} />
            </linearGradient>

            <linearGradient id="BG3" x1="50%" x2="50%" y1="0%" y2="100%">
              <stop offset="0%" stopColor={PRIMARY_LIGHT} />
              <stop offset="100%" stopColor={PRIMARY_MAIN} />
            </linearGradient>
          </defs>

          <g fill={PRIMARY_MAIN} fillRule="evenodd" stroke="none" strokeWidth="1">
            <path
              fill="url(#BG1)"
              d="M183.168 285.573l-2.918 5.298-2.973 5.363-2.846 5.095-2.274 4.043-2.186 3.857-2.506 4.383-1.6 2.774-2.294 3.939-1.099 1.869-1.416 2.388-1.025 1.713-1.317 2.18-.95 1.558-1.514 2.447-.866 1.38-.833 1.312-.802 1.246-.77 1.18-.739 1.111-.935 1.38-.664.956-.425.6-.41.572-.59.8-.376.497-.537.69-.171.214c-10.76 13.37-22.496 23.493-36.93 29.334-30.346 14.262-68.07 14.929-97.202-2.704l72.347-124.682 2.8-1.72c49.257-29.326 73.08 1.117 94.02 40.927z"
            />
            <path
              fill="url(#BG2)"
              d="M444.31 229.726c-46.27-80.956-94.1-157.228-149.043-45.344-7.516 14.384-12.995 42.337-25.267 42.337v-.142c-12.272 0-17.75-27.953-25.265-42.337C189.79 72.356 141.96 148.628 95.69 229.584c-3.483 6.106-6.828 11.932-9.69 16.996 106.038-67.127 97.11 135.667 184 137.278V384c86.891-1.611 77.962-204.405 184-137.28-2.86-5.062-6.206-10.888-9.69-16.994"
            />
            <path
              fill="url(#BG3)"
              d="M450 384c26.509 0 48-21.491 48-48s-21.491-48-48-48-48 21.491-48 48 21.491 48 48 48"
            />
          </g>
        </svg> */}
        {/* <img src="/favicon/apple-touch-icon-57x57.png" style={{ objectFit: 'contain' }} /> */}
        <img src="/favicon/apple-touch-icon-57x57.png" style={{ width: 32, height: 32, objectFit: 'contain' }} />

        <Typography
          // textTransform="uppercase"
          sx={{
            // color: '#354884',
            color: 'black',
            fontWeight: 900,
            fontSize: 20,
            // fontFamily: 'Work Sans,sans-serif',
          }}
        >
          Talents Reach
        </Typography>
        {/*  <SVGLogo /> */}
        {/* {!isNavMini && (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 104 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.492 0.519999V11.636C16.492 14.044 15.7827 15.92 14.364 17.264C12.9453 18.608 10.9107 19.28 8.26 19.28C6.31867 19.28 4.75067 18.9347 3.556 18.244C2.38 17.5533 1.57733 16.6013 1.148 15.388C0.718667 14.1747 0.625333 12.7933 0.868 11.244L6.496 10.292C6.272 12.0093 6.328 13.2133 6.664 13.904C7.01867 14.576 7.63467 14.912 8.512 14.912C9.31467 14.912 9.89333 14.6133 10.248 14.016C10.6027 13.4 10.78 12.4387 10.78 11.132V0.519999H16.492ZM28.1041 0.24C30.0268 0.24 31.6695 0.622666 33.0321 1.388C34.4135 2.13467 35.4681 3.21733 36.1961 4.636C36.9428 6.05467 37.3161 7.76267 37.3161 9.76C37.3161 11.7573 36.9428 13.4653 36.1961 14.884C35.4681 16.3027 34.4135 17.3947 33.0321 18.16C31.6695 18.9067 30.0268 19.28 28.1041 19.28C26.2001 19.28 24.5481 18.9067 23.1481 18.16C21.7668 17.3947 20.7028 16.3027 19.9561 14.884C19.2095 13.4653 18.8361 11.7573 18.8361 9.76C18.8361 7.76267 19.2095 6.05467 19.9561 4.636C20.7028 3.21733 21.7668 2.13467 23.1481 1.388C24.5481 0.622666 26.2001 0.24 28.1041 0.24ZM28.1041 4.608C27.3388 4.608 26.7041 4.804 26.2001 5.196C25.7148 5.56933 25.3415 6.12933 25.0801 6.876C24.8375 7.62267 24.7161 8.584 24.7161 9.76C24.7161 10.9173 24.8375 11.8787 25.0801 12.644C25.3415 13.3907 25.7148 13.96 26.2001 14.352C26.7041 14.7253 27.3388 14.912 28.1041 14.912C28.8508 14.912 29.4761 14.7253 29.9801 14.352C30.4841 13.96 30.8575 13.3907 31.1001 12.644C31.3428 11.8787 31.4641 10.9173 31.4641 9.76C31.4641 8.584 31.3428 7.62267 31.1001 6.876C30.8575 6.12933 30.4841 5.56933 29.9801 5.196C29.4761 4.804 28.8508 4.608 28.1041 4.608ZM40.0713 19V0.519999H49.8993C52.2139 0.538666 53.9219 0.967999 55.0233 1.808C56.1433 2.62933 56.7033 3.852 56.7033 5.476C56.7033 6.54 56.3766 7.45467 55.7233 8.22C55.0886 8.98533 54.0899 9.47067 52.7273 9.676V9.704C54.2393 9.89067 55.3593 10.376 56.0873 11.16C56.8153 11.944 57.1793 12.9147 57.1793 14.072C57.1793 15.6773 56.6193 16.9 55.4993 17.74C54.3979 18.58 52.7273 19 50.4873 19H40.0713ZM45.5593 15.136H49.1713C49.8993 15.136 50.4406 14.996 50.7953 14.716C51.1499 14.4173 51.3273 13.9973 51.3273 13.456C51.3273 12.9147 51.1499 12.504 50.7953 12.224C50.4406 11.944 49.8993 11.804 49.1713 11.804H45.5593V15.136ZM45.5593 7.856H48.7513C50.1513 7.856 50.8513 7.30533 50.8513 6.204C50.8513 5.10267 50.1513 4.552 48.7513 4.552H45.5593V7.856ZM65.2247 0.519999V19H59.5127V0.519999H65.2247ZM83.5135 4.804H74.3575V8.024H81.6935V12.308H74.3575V19H68.6455V0.519999H83.5135V4.804ZM103.065 0.519999L96.5974 12.448V19H90.8574V12.448L84.3614 0.519999H90.1574L92.3974 5.14L93.7694 8.36L95.1134 5.14L97.3814 0.519999H103.065Z"
              fill="#6D88C2"
            />
          </svg>
        )} */}
      </Box>
    );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link
        component={NextLink}
        href={
          user?.role_id === 3
            ? '/dashboard/candidate'
            : user?.role_id === 2
              ? '/dashboard/employer'
              : user?.role_id === 1
                ? '/super-admin/dashboard'
                : '/'
        }
        sx={{ display: 'contents' }}
      >
        {logo}
      </Link>
    );
  }
);

export default Logo;