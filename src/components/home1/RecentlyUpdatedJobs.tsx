import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React from 'react';
import { recentJob } from 'src/utils/constData';
import Rating from '@mui/material/Rating';
import { BookmarkIcon, CurvedArrow, LocationIcon, UserIcon } from 'src/theme/overrides/CustomIcons';
import { useRouter } from 'next/router';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Marquee = ({ children }) => (
  <Box
    sx={{
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      display: 'flex',
      flexDirection: 'column',
      height: '300px',
      position: 'relative',
    }}
  >
    <Box
      sx={{
        display: 'inline-block',
        animation: 'marquee 1000s linear infinite',
      }}
    >
      {children}
    </Box>
    <style jsx>{`
      @keyframes marquee {
        0% {
          transform: translateY(0%);
        }
        100% {
          transform: translateY(-100%);
        }
      }
    `}</style>
  </Box>
);

const TalentsReachBulletin = ({ isCandidateDash = false, executeScroll = () => {} }: any) => {
  const { push } = useRouter();

  return (
    <>
      <Typography variant="h5" component="div" gutterBottom textAlign="center">
        Talents Reach Bulletin
      </Typography>

      <Marquee>
        {Array.from({ length: 100 }, (_, index) => (
          <List sx={{ mt: 0 }}>
            <ListItem>
              <ListItemIcon>
                <CurvedArrow />
              </ListItemIcon>
              <ListItemText
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
                primary={
                  <Typography
                    fontSize={{ xs: '16px', md: '24px' }}
                    sx={{
                      whiteSpace: 'wrap',
                      color: '#000',
                    }}
                  >
                    Check our recently{' '}
                    <Box
                      component="span"
                      onClick={() => {
                        if (isCandidateDash) {
                          push('/candidate/jobs/search-jobs/');
                        } else {
                          push('/login');
                        }
                      }}
                      sx={{
                        color: '#FFBB00',
                        fontStyle: 'italic',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                      }}
                    >
                      updated jobs
                    </Box>
                  </Typography>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CurvedArrow />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    fontSize={{ xs: '16px', md: '24px' }}
                    sx={{
                      whiteSpace: 'wrap',
                    }}
                  >
                    Today’s walk-in interview’s{' '}
                    <Box
                      component="span"
                      onClick={() => {
                        push('/login');
                      }}
                      sx={{
                        color: '#FFBB00',
                        fontStyle: 'italic',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                      }}
                    >
                      update{' '}
                    </Box>
                    / Walk in interview of the week
                  </Typography>
                }
              />
            </ListItem>
            {/* <ListItem>
              <ListItemIcon>
                <CurvedArrow />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    fontSize={{ xs: '16px', md: '24px' }}
                    sx={{
                      whiteSpace: 'wrap',
                    }}
                  >
                    Recently hired:{' '}
                    <Box
                      component="span"
                      onClick={() => push('/login')}
                      sx={{
                        color: '#FFBB00',
                        fontStyle: 'italic',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                      }}
                    >
                      Fresher Accountant
                    </Box>
                  </Typography>
                }
              />
            </ListItem> */}
            {/* <ListItem>
              <ListItemIcon>
                <CurvedArrow />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    fontSize={{ xs: '16px', md: '24px' }}
                    sx={{
                      whiteSpace: 'wrap',
                    }}
                  >
                    Latest course published: Data Analytics
                    <Box
                      component="span"
                      onClick={() => {
                        // if (isCandidateDash) {
                        //   push('/candidate/services/certification/');
                        // } else {
                        // }
                        push('/login');
                      }}
                      sx={{
                        color: '#FFBB00',
                        fontStyle: 'italic',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                      }}
                    >
                      Fresher Accountant
                    </Box>
                  </Typography>
                }
              />
            </ListItem> */}
            <ListItem>
              <ListItemIcon>
                <CurvedArrow />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    fontSize={{ xs: '16px', md: '24px' }}
                    sx={{
                      whiteSpace: 'wrap',
                    }}
                  >
                    Latest course published:{' '}
                    <Box
                      component="span"
                      onClick={() => {
                        if (isCandidateDash) {
                          push('/candidate/services/certification/');
                        } else {
                          push('/login');
                        }
                      }}
                      sx={{
                        color: '#FFBB00',
                        fontStyle: 'italic',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                      }}
                    >
                      Data Analytics
                    </Box>
                  </Typography>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CurvedArrow />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    fontSize={{ xs: '16px', md: '24px' }}
                    sx={{
                      whiteSpace: 'wrap',
                    }}
                  >
                    Aptitude questions to{' '}
                    <Box
                      component="span"
                      onClick={() => push('/login')}
                      sx={{
                        color: '#FFBB00',
                        fontStyle: 'italic',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                      }}
                    >
                      prepare for job{' '}
                    </Box>
                    interviews
                  </Typography>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CurvedArrow />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    fontSize={{ xs: '16px', lg: '24px' }}
                    sx={{
                      whiteSpace: 'wrap',
                    }}
                  >
                    Challenge of the week is{' '}
                    <Box
                      component="span"
                      onClick={() => {
                        if (isCandidateDash) {
                          executeScroll();
                        } else {
                          push('/login');
                        }
                      }}
                      sx={{
                        color: '#FFBB00',
                        fontStyle: 'italic',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                      }}
                    >
                      active{' '}
                    </Box>
                  </Typography>
                }
              />
            </ListItem>
          </List>
        ))}
      </Marquee>
    </>
  );
};

const globalStyles = {
  '@global': {
    '@keyframes marquee': {
      '0%': {
        top: '100%',
      },
      '100%': {
        top: '-100%',
      },
    },
  },
};

export { globalStyles };

export const RecentlyUpdatedJobs = ({ isCandidateDash = false, executeScroll }: any) => {
  const route = useRouter();

  return (
    <Box
      sx={{
        backgroundImage: isCandidateDash ? '' : `url(${'/assets/bulatinPic.png'})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        paddingY: 2,
        paddingX: { xs: 2, md: 10, lg: 20, xl: 20 },
      }}
    >
      {/* <TalentsReachBulletin /> */}
      <Box
        sx={{
          width: '400px',
          height: '300px',
          display: 'flex',
          flexDirection: 'column',
          // alignItems: 'center',
          borderRadius: 0.5,
          background: '#fff',
          opacity: 0.6,
          paddingY: 4,
          paddingX: { xs: 2, md: 6, lg: 10, xl: 10 },
          position: 'relative',
        }}
      >
        <TalentsReachBulletin isCandidateDash={isCandidateDash} executeScroll={executeScroll} />
      </Box>
    </Box>
  );
};
