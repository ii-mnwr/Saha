// Footer.tsx
import * as React from 'react';
import { Box, Container, Grid, Typography, Link, Divider, SvgIcon, useMediaQuery } from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useRouter } from 'next/router';
import FacebookIcon from '@mui/icons-material/Facebook';

const FooterLink = (props: { title: string; path?: string }) => {
  const { user } = useAuthContext();
  const { push } = useRouter();
  return (
    // Custom link component for styling
    <Typography
      color="#fff"
      fontWeight={400}
      fontFamily="Inter,sans-serif"
      fontSize={{ xs: 12, sm: 13 }}
      gutterBottom
      sx={{
        cursor: 'pointer',
        marginBottom: 1.5,
      }}
      onClick={() => {
        push(props?.path ? props?.path : '/sign-up');
      }}
    >
      {props?.title}
    </Typography>
  );
};

const Footer = () => {
  const theme: Theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        background: '#0A2239',
        paddingY: { xs: 3, sm: 2 },
        flexDirection: 'column',
        display: 'flex',
        gap: 1,
      }}
    >
      {/* Top social media bar */}
      <Box
        paddingX={{ xs: 2, sm: 5, lg: 22 }}
        display="flex"
        justifyContent={{ xs: 'center', sm: 'flex-end' }}
        alignItems="center"
        gap={{ xs: 1, sm: 2 }}
        flexWrap="wrap"
      >
        <Typography color="#fff" fontWeight={600} fontSize={{ xs: 14, sm: 16 }}>
          Connect With Us :
        </Typography>
        <Box display="flex" flexDirection="row" alignItems="center" gap={{ xs: 1.5, sm: 2 }}>
          <Box component="a" href="https://www.facebook.com" target="_blank">
            <SvgIcon fontSize={isMobile ? "small" : "medium"}>
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Facebook icon</title>
                <path
                  d="M23.9981 11.9991C23.9981 5.37216 18.626 0 11.9991 0C5.37216 0 0 5.37216 0 11.9991C0 17.9882 4.38789 22.9522 10.1242 23.8524V15.4676H7.07758V11.9991H10.1242V9.35553C10.1242 6.34826 11.9156 4.68714 14.6564 4.68714C15.9692 4.68714 17.3424 4.92149 17.3424 4.92149V7.87439H15.8294C14.3388 7.87439 13.8739 8.79933 13.8739 9.74824V11.9991H17.2018L16.6698 15.4676H13.8739V23.8524C19.6103 22.9522 23.9981 17.9882 23.9981 11.9991Z"
                  fill="#fff"
                />
              </svg>
            </SvgIcon>
          </Box>
          <Box component="a" href="https://twitter.com" target="_blank">
            <SvgIcon fontSize={isMobile ? "small" : "medium"}>
              <svg
                width="16"
                height="16"
                viewBox="0 -3 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.0901 0H12.1795L7.89788 5.01961L13 11.5H9.06748L5.95267 7.62451L2.42114 11.5H0.326446L4.89454 6.13725L0 0H4.0418L6.84711 3.52745L10.0901 0ZM9.61889 10.3333H10.6942L3.41732 1.1098H2.25723L9.61889 10.3333Z"
                  fill="#fff"
                />
              </svg>
            </SvgIcon>
          </Box>
          <Box component="a" href="https://www.linkedin.com" target="_blank">
            <SvgIcon fontSize={isMobile ? "small" : "medium"}>
              <svg
                fill="#fff"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                data-name="Layer 1"
              >
                <path d="M20.47,2H3.53A1.45,1.45,0,0,0,2.06,3.43V20.57A1.45,1.45,0,0,0,3.53,22H20.47a1.45,1.45,0,0,0,1.47-1.43V3.43A1.45,1.45,0,0,0,20.47,2ZM8.09,18.74h-3v-9h3ZM6.59,8.48h0a1.56,1.56,0,1,1,0-3.12,1.57,1.57,0,1,1,0,3.12ZM18.91,18.74h-3V13.91c0-1.21-.43-2-1.52-2A1.65,1.65,0,0,0,12.85,13a2,2,0,0,0-.1.73v5h-3s0-8.18,0-9h3V11A3,3,0,0,1,15.46,9.5c2,0,3.45,1.29,3.45,4.06Z" />
              </svg>
            </SvgIcon>
          </Box>
          <Box component="a" href="https://www.instagram.com" target="_blank">
            <SvgIcon fontSize={isMobile ? "small" : "medium"}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 0C5.829 0 5.556 0.01 4.703 0.048C3.85 0.088 3.269 0.222 2.76 0.42C2.22 0.624 1.787 0.898 1.343 1.343C0.898 1.787 0.623 2.22 0.42 2.759C0.222 3.268 0.087 3.85 0.048 4.702C0.01 5.555 0 5.827 0 8.001C0 10.173 0.01 10.445 0.048 11.298C0.087 12.15 0.222 12.731 0.42 13.24C0.624 13.78 0.898 14.212 1.343 14.656C1.787 15.101 2.22 15.376 2.759 15.579C3.269 15.778 3.851 15.913 4.703 15.952C5.556 15.99 5.829 16 8 16C10.171 16 10.444 15.99 11.297 15.952C12.149 15.913 12.73 15.778 13.24 15.579C13.78 15.376 14.212 15.101 14.656 14.656C15.101 14.212 15.376 13.78 15.58 13.24C15.778 12.731 15.913 12.149 15.952 11.298C15.99 10.445 16 10.173 16 8C16 5.829 15.99 5.556 15.952 4.703C15.913 3.85 15.778 3.269 15.58 2.76C15.376 2.22 15.101 1.787 14.656 1.343C14.212 0.898 13.78 0.623 13.24 0.42C12.73 0.222 12.149 0.087 11.297 0.048C10.444 0.01 10.171 0 8 0ZM8 1.441C10.136 1.441 10.389 1.452 11.233 1.488C12.013 1.521 12.437 1.654 12.719 1.763C13.092 1.908 13.359 2.082 13.639 2.362C13.919 2.642 14.092 2.908 14.237 3.281C14.346 3.563 14.479 3.987 14.512 4.767C14.548 5.611 14.559 5.864 14.559 8C14.559 10.136 14.548 10.389 14.512 11.233C14.479 12.013 14.346 12.437 14.237 12.719C14.092 13.092 13.919 13.359 13.639 13.639C13.359 13.919 13.092 14.092 12.719 14.237C12.437 14.346 12.013 14.479 11.233 14.512C10.389 14.548 10.137 14.559 8 14.559C5.864 14.559 5.61 14.548 4.767 14.512C3.987 14.479 3.563 14.346 3.281 14.237C2.908 14.092 2.642 13.919 2.362 13.639C2.082 13.359 1.908 13.092 1.763 12.719C1.654 12.437 1.521 12.013 1.488 11.233C1.452 10.389 1.441 10.136 1.441 8C1.441 5.864 1.452 5.611 1.488 4.767C1.521 3.987 1.654 3.563 1.763 3.281C1.908 2.908 2.082 2.642 2.362 2.362C2.642 2.082 2.908 1.908 3.281 1.763C3.563 1.654 3.987 1.521 4.767 1.488C5.611 1.452 5.864 1.441 8 1.441Z"
                  fill="#fff"
                />
                <path
                  d="M8 10.6667C6.5273 10.6667 5.33334 9.47269 5.33334 8.00001C5.33334 6.52733 6.5273 5.33334 8 5.33334C9.47272 5.33334 10.6667 6.52733 10.6667 8.00001C10.6667 9.47269 9.47272 10.6667 8 10.6667ZM8 3.89201C5.73192 3.89201 3.89203 5.73193 3.89203 8.00001C3.89203 10.2681 5.73192 12.108 8 12.108C10.2681 12.108 12.108 10.2681 12.108 8.00001C12.108 5.73193 10.2681 3.89201 8 3.89201Z"
                  fill="#fff"
                />
                <path
                  d="M13.2307 3.72904C13.2307 4.25951 12.7997 4.69051 12.2692 4.69051C11.7388 4.69051 11.3077 4.25951 11.3077 3.72904C11.3077 3.19857 11.7388 2.76758 12.2692 2.76758C12.7997 2.76758 13.2307 3.19857 13.2307 3.72904Z"
                  fill="#fff"
                />
              </svg>
            </SvgIcon>
          </Box>
        </Box>
      </Box>

      <Divider
        sx={{
          backgroundColor: 'white',
          height: '1px',
          width: 'calc(100% - 10%)',
          marginX: '5%',
          marginBottom: { xs: 3, sm: 5 },
        }}
      />

      {/* Main footer content */}
      <Box mt={{ xs: 2, sm: 4 }} paddingX={{ xs: 2, sm: 6, lg: 16 }}>
        <Grid container spacing={{ xs: 3, sm: 2 }} justifyContent="space-between">
          {/* Left column - Company Information */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              color="#fff"
              fontWeight={800}
              fontFamily="Archivo, sans-serif"
              fontSize={{ xs: 20, sm: 24 }}
              mb={2}
              align={isMobile ? "center" : "left"}
            >
              Talents Reach
            </Typography>
            <Box 
              display="flex" 
              flexDirection="column" 
              gap={2}
              alignItems={isMobile ? "center" : "flex-start"}
            >
              <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
                <SvgIcon fontSize={isMobile ? "small" : "medium"}>
                  <svg
                    width="800px"
                    height="800px"
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#fff"
                      d="M800 416a288 288 0 10-576 0c0 118.144 94.528 272.128 288 456.576C705.472 688.128 800 534.144 800 416zM512 960C277.312 746.688 160 565.312 160 416a352 352 0 01704 0c0 149.312-117.312 330.688-352 544z"
                    />
                    <path
                      fill="#fff"
                      d="M512 512a96 96 0 100-192 96 96 0 000 192zm0 64a160 160 0 110-320 160 160 0 010 320z"
                    />
                  </svg>
                </SvgIcon>
                <Typography color="#fff" fontSize={{ xs: 12, sm: 14 }}>
                  Business Bay, Dubai
                </Typography>
              </Box>
              <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
                <SvgIcon fontSize={isMobile ? "small" : "medium"}>
                  <svg
                    fill="#ffffff"
                    width="800px"
                    height="800px"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3.84674576,17.8602756 C4.0442161,17.955959 4.26584099,18.0096122 4.49999728,18.0096122 L19.5,18.0096122 C19.734157,18.0096122 19.9557825,17.9559587 20.1532533,17.8602747 L14.2446247,12.2992125 L12.3178536,13.8859651 C12.1332257,14.0380116 11.8667743,14.0380116 11.6821464,13.8859651 L9.75537533,12.2992125 L3.84674576,17.8602756 L3.84674576,17.8602756 Z M3.1430925,17.1498223 C3.1477226,17.1451097 3.15246435,17.1404678 3.15731765,17.1359 L8.97720082,11.6583629 L3.18214637,6.88596512 C3.16950983,6.87555855 3.15751523,6.86466152 3.14616744,6.85332433 C3.05246763,7.04913384 2.99999728,7.26843937 2.99999728,7.5 L2.99999728,16.5096122 C2.99999728,16.7386275 3.05132045,16.9556556 3.1430925,17.1498223 L3.1430925,17.1498223 Z M20.8569057,17.1498204 C20.9486772,16.9556542 21,16.7386268 21,16.5096122 L21,7.5 C21,7.26844009 20.94753,7.04913522 20.8538307,6.85332617 C20.8424835,6.86466269 20.8304895,6.87555911 20.8178536,6.88596512 L15.0227992,11.6583629 L20.8426823,17.1359 C20.847535,17.1404672 20.8522762,17.1451085 20.8569057,17.1498204 L20.8569057,17.1498204 Z M20.1444281,6.14509696 C19.9491886,6.05206979 19.7306751,6 19.5,6 L4.49999728,6 C4.26932289,6 4.05080997,6.05206949 3.85557086,6.14509614 L12,12.8522731 L20.1444281,6.14509696 L20.1444281,6.14509696 Z M4.49999728,5 L19.5,5 C20.8807119,5 22,6.11928813 22,7.5 L22,16.5096122 C22,17.8903241 20.8807119,19.0096122 19.5,19.0096122 L4.49999728,19.0096122 C3.11928541,19.0096122 1.99999728,17.8903241 1.99999728,16.5096122 L1.99999728,7.5 C1.99999728,6.11928813 3.11928541,5 4.49999728,5 Z" />
                  </svg>
                </SvgIcon>
                <Typography color="#fff" fontSize={{ xs: 12, sm: 14 }}>
                  info@talentsreach.com
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Center column - Quick Links */}
          <Grid item xs={6} sm={3} md={1}>
            <Typography
              color="#fff"
              fontWeight={600}
              fontFamily="Archivo ,sans-serif"
              fontSize={{ xs: 14, sm: 16 }}
              gutterBottom
              mb={{ xs: 1.5, sm: 3 }}
              align={isMobile ? "center" : "left"}
            >
              Quick Links
            </Typography>
            <Box 
              display="flex" 
              flexDirection="column"
              alignItems={isMobile ? "center" : "flex-start"}
            >
              <FooterLink title="About Us" path="/about-us" />
              <FooterLink title="Services" />
              <FooterLink title="Contact Us" path="/contact-us" />
            </Box>
          </Grid>

          {/* Right column - Our Services */}
          <Grid item xs={6} sm={3} md={4}>
            <Typography
              color="#fff"
              fontWeight={600}
              fontFamily="Roboto,sans-serif"
              fontSize={{ xs: 14, sm: 16 }}
              gutterBottom
              mb={{ xs: 1.5, sm: 3 }}
              align={isMobile ? "center" : "left"}
            >
              Our Services
            </Typography>
            <Box 
              display="flex" 
              flexDirection="column"
              alignItems={isMobile ? "center" : "flex-start"}  
            >
              <FooterLink title="Job Listing" path="/candidate/jobs/search-jobs" />
              <FooterLink title="Employer Listing" path="/candidate/jobs/recommended-jobs" />
              <FooterLink title="Post a New Job" path="/post-job" />
              <FooterLink title="Featured Job" path="/candidate/jobs/job-alerts" />
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Copyright section */}
      <Divider
        sx={{
          backgroundColor: 'white',
          height: '1.5px',
          width: 'calc(100% - 10%)',
          marginX: '5%',
          marginTop: { xs: 5, sm: 12 },
          marginBottom: { xs: 1, sm: 2 },
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'center', sm: 'center' },
          paddingX: { xs: 2, sm: 6, lg: 10 },
          paddingY: 1,
          marginBottom: { xs: 2, sm: 5 },
          gap: { xs: 2, sm: 0 },
        }}
      >
        <Typography variant="body2" color="#fff" align={isMobile ? "center" : "left"}>
          © All rights reserved.
        </Typography>
        <Box 
          display="flex" 
          gap={{ xs: 1.5, sm: 3 }}
          flexDirection={isMobile ? "column" : "row"}
          alignItems="center"
        >
          <Typography
            variant="body2"
            color="#fff"
            sx={{ cursor: 'pointer', textDecoration: 'underline', fontSize: { xs: 10, sm: 12 } }}
            onClick={() => {
              // Link functionality
            }}
          >
            Privacy Policy
          </Typography>
          <Typography
            variant="body2"
            color="#fff"
            sx={{ cursor: 'pointer', textDecoration: 'underline', fontSize: { xs: 10, sm: 12 } }}
            onClick={() => {
              // Link functionality
            }}
          >
            Terms of Service
          </Typography>
          <Typography
            variant="body2"
            color="#fff"
            sx={{ cursor: 'pointer', textDecoration: 'underline', fontSize: { xs: 10, sm: 12 } }}
            onClick={() => {
              // Link functionality
            }}
          >
            Cookie Settings
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;