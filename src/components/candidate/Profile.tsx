import { Avatar, Box, Divider, Rating, Typography } from '@mui/material';
import React from 'react';
import {
  FacebookIcon,
  FileIcon,
  InstagramIcon,
  LinkedinIcon,
  LocationIcon,
  TimeIcon,
  TwitterIcon,
} from 'src/theme/overrides/CustomIcons';

export const Profile = () => (
  <Box
    paddingX={4}
    paddingY={3}
    marginTop={2}
    sx={{
      background: '#F5F8FF7D',
      borderRadius: 2,
      boxShadow: 4,
    }}
  >
    <Typography color="#086BFF" fontFamily="Work Sans,sans-serif" fontSize={24} fontWeight={600}>
      Recent Changes to My Profile
    </Typography>
    <Box display="flex" flexDirection={{ xs: 'column', xl: 'row' }} gap={2} marginTop={3}>
      <Box display="flex" flexDirection="column" gap={2}>
        <Box
          sx={{
            boxShadow: '2px 2px 4px 0px #00000040',
            background: '#FFFFFF',
            minWidth: { xl: 345 },
            width: '100%',
            borderRadius: 2,
          }}
        >
          <Box
            padding={3}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap={1}
          >
            <Avatar
              src="/assets/candidate2.jpeg"
              sx={{
                width: 100,
                height: 100,
              }}
            />
            <Typography fontFamily="Inter,sans-serif" fontWeight={600} fontSize={24} color="#000">
              George Well
            </Typography>
            <Typography fontWeight={300} fontFamily="Inter,sans-serif" fontSize={16}>
              IOS Developer
            </Typography>
            <Box
              width="100%"
              display="flex"
              justifyContent="center"
              flexDirection="row"
              alignItems="center"
              gap={1}
            >
              <Rating name="size-small" defaultValue={5} size="small" />
              <Typography fontFamily="Inter,sans-serif" fontWeight={400} fontSize={16} color="#000">
                5.0
              </Typography>
            </Box>
            <Box
              width="100%"
              display="flex"
              justifyContent="center"
              flexDirection="row"
              alignItems="center"
              gap={2}
            >
              <Box
                sx={{
                  background: '#6D88C23D',
                  borderRadius: '50%',
                  width: 40,
                  height: 40,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <FacebookIcon />
              </Box>
              <Box
                sx={{
                  background: '#6D88C23D',
                  borderRadius: '50%',
                  width: 40,
                  height: 40,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <InstagramIcon />
              </Box>
              <Box
                sx={{
                  background: '#6D88C23D',
                  borderRadius: '50%',
                  width: 40,
                  height: 40,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <TwitterIcon />
              </Box>
              <Box
                sx={{
                  background: '#6D88C23D',
                  borderRadius: '50%',
                  width: 40,
                  height: 40,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <LinkedinIcon />
              </Box>
            </Box>
          </Box>

          <Divider
            variant="middle"
            sx={{
              borderColor: '#85B6FF',
            }}
          />
          <Box padding={3} display="flex" flexDirection="column" gap={1}>
            <Typography
              fontWeight={400}
              color="#086BFF"
              fontSize={16}
              fontFamily="Inter,sans-serif"
            >
              Contact Info
            </Typography>
            <Box>
              <Typography
                fontWeight={300}
                color="#101010"
                fontFamily="Inter,sans-serif"
                fontSize={14}
              >
                Location
              </Typography>
              <Typography
                fontWeight={600}
                color="#101010"
                fontFamily="Inter,sans-serif"
                fontSize={12}
              >
                Melbourne, Australia
              </Typography>
            </Box>
            <Box>
              <Typography
                fontWeight={300}
                color="#101010"
                fontFamily="Inter,sans-serif"
                fontSize={14}
              >
                Email
              </Typography>
              <Typography
                fontWeight={600}
                color="#101010"
                fontFamily="Inter,sans-serif"
                fontSize={12}
              >
                info@talentsreach.com
              </Typography>
            </Box>
            <Box>
              <Typography
                fontWeight={300}
                color="#101010"
                fontFamily="Inter,sans-serif"
                fontSize={14}
              >
                Phone
              </Typography>
              <Typography
                fontWeight={600}
                color="#101010"
                fontFamily="Inter,sans-serif"
                fontSize={12}
              >
                +44 7123 243 7890
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            background: '#E5E8F5',
            borderRadius: 2,
            boxShadow: 3,
            paddingX: 3,
            paddingTop: 1,
            paddingBottom: 4,
          }}
        >
          <Typography fontWeight={600} fontFamily="Inter,sans-serif" fontSize={18} color="#000">
            Download Resume
          </Typography>
          <Box
            sx={{
              marginTop: 2,
              background: '#fff',
              display: 'flex',
              padding: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            <Typography fontWeight={400} fontSize={20} fontFamily="Inter,sans-serif" color="#000">
              PDF Formate CV
            </Typography>
            <FileIcon />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          boxShadow: '2px 2px 4px 0px #00000040',
          background: '#FFFFFF',
          width: '100%',
          borderRadius: 2,
          padding: 2,
        }}
      >
        <Typography color="#000000" fontFamily="Inter,sans-serif" fontWeight={600} fontSize={20}>
          About
        </Typography>
        <Typography
          marginLeft={1}
          marginTop={1}
          color="#000000"
          fontFamily="Inter,sans-serif"
          fontWeight={300}
          fontSize={18}
        >
          A talented professional with an academic background in IT and proven commercial
          development experience as C++ developer since 1999. Has a sound knowledge of the software
          development life cycle. Was involved in more than 140 software development outsourcing
          projects. Programming Languages: C/C++, .NET C++, Python, Bash, Shell, PERL, Regular
          expressions, Python, Active-script.
        </Typography>
        <Typography
          marginTop={2}
          color="#000000"
          fontFamily="Inter,sans-serif"
          fontWeight={600}
          fontSize={24}
        >
          Work Experience
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            paddingX: 1,
            paddingY: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 2,
              width: '100%',
            }}
          >
            <Avatar
              sx={{
                width: 70,
                height: 70,
                boxShadow: '0px 4px 4px 0px #00000040, 0px 4px 4px 0px #00000040 inset',
              }}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: 1,
              }}
            >
              <Typography
                color="#000000"
                fontFamily="Inter,sans-serif"
                fontWeight={600}
                fontSize={18}
                lineHeight={1}
              >
                Product Designer
              </Typography>
              <Typography
                color="#000000"
                fontFamily="Inter,sans-serif"
                fontWeight={200}
                fontSize={18}
                lineHeight={1}
              >
                Coding Agency
              </Typography>
              <Box
                width="100%"
                display="flex"
                flexDirection={{ xs: 'column', md: 'row' }}
                alignItems={{ xs: 'flex-start', md: 'center' }}
                gap={{ xs: 1, md: 4 }}
              >
                <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
                  <LocationIcon fill="#979797B0" />
                  <Typography
                    color="#000000"
                    fontFamily="Work Sans,sans-serif"
                    fontWeight={500}
                    fontSize={12}
                  >
                    Hicks St Brooklyn, NY
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
                  <TimeIcon fill="#979797B0" />
                  <Typography
                    color="#000000"
                    fontFamily="Inter,sans-serif"
                    fontWeight={300}
                    fontSize={12}
                  >
                    Jun 2017 - April 2020- 3 years
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 2,
              width: '100%',
            }}
          >
            <Avatar
              sx={{
                width: 70,
                height: 70,
                boxShadow: '0px 4px 4px 0px #00000040, 0px 4px 4px 0px #00000040 inset',
              }}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: 1,
              }}
            >
              <Typography
                color="#000000"
                fontFamily="Inter,sans-serif"
                fontWeight={600}
                fontSize={18}
                lineHeight={1}
              >
                Sr. UI/UX Designer
              </Typography>
              <Typography
                color="#000000"
                fontFamily="Inter,sans-serif"
                fontWeight={200}
                fontSize={18}
                lineHeight={1}
              >
                99 Coding
              </Typography>
              <Box
                width="100%"
                display="flex"
                flexDirection={{ xs: 'column', md: 'row' }}
                alignItems={{ xs: 'flex-start', md: 'center' }}
                gap={{ xs: 1, md: 4 }}
              >
                <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
                  <LocationIcon fill="#979797B0" />
                  <Typography
                    color="#000000"
                    fontFamily="Work Sans,sans-serif"
                    fontWeight={500}
                    fontSize={12}
                  >
                    05 San Antonio, TX
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
                  <TimeIcon fill="#979797B0" />
                  <Typography
                    color="#000000"
                    fontFamily="Inter,sans-serif"
                    fontWeight={300}
                    fontSize={12}
                  >
                    Jun 2019 - April 2021- 2 Years
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Typography
          marginTop={2}
          color="#000000"
          fontFamily="Inter,sans-serif"
          fontWeight={600}
          fontSize={24}
        >
          Education
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            paddingX: 1,
            paddingY: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 2,
              width: '100%',
            }}
          >
            <Avatar
              sx={{
                width: 70,
                height: 70,
                boxShadow: '0px 4px 4px 0px #00000040, 0px 4px 4px 0px #00000040 inset',
              }}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: 1,
              }}
            >
              <Typography
                color="#000000"
                fontFamily="Inter,sans-serif"
                fontWeight={600}
                fontSize={18}
                lineHeight={1}
              >
                Bachelor in Software Engineering
              </Typography>
              <Typography
                color="#000000"
                fontFamily="Inter,sans-serif"
                fontWeight={200}
                fontSize={18}
                lineHeight={1}
              >
                Harvard University
              </Typography>
              <Box
                width="100%"
                display="flex"
                flexDirection={{ xs: 'column', md: 'row' }}
                alignItems={{ xs: 'flex-start', md: 'center' }}
                gap={{ xs: 1, md: 4 }}
              >
                <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
                  <LocationIcon fill="#979797B0" />
                  <Typography
                    color="#000000"
                    fontFamily="Work Sans,sans-serif"
                    fontWeight={500}
                    fontSize={12}
                  >
                    Brylin, USA
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
                  <TimeIcon fill="#979797B0" />
                  <Typography
                    color="#000000"
                    fontFamily="Inter,sans-serif"
                    fontWeight={300}
                    fontSize={12}
                  >
                    Jun 2016 - April 2020- 4 Years
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 2,
              width: '100%',
            }}
          >
            <Avatar
              sx={{
                width: 70,
                height: 70,
                boxShadow: '0px 4px 4px 0px #00000040, 0px 4px 4px 0px #00000040 inset',
              }}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: 1,
              }}
            >
              <Typography
                color="#000000"
                fontFamily="Inter,sans-serif"
                fontWeight={600}
                fontSize={18}
                lineHeight={1}
              >
                Masters in Art Design
              </Typography>
              <Typography
                color="#000000"
                fontFamily="Inter,sans-serif"
                fontWeight={200}
                fontSize={18}
                lineHeight={1}
              >
                Harvard University
              </Typography>
              <Box
                width="100%"
                display="flex"
                flexDirection={{ xs: 'column', md: 'row' }}
                alignItems={{ xs: 'flex-start', md: 'center' }}
                gap={{ xs: 1, md: 4 }}
              >
                <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
                  <LocationIcon fill="#979797B0" />
                  <Typography
                    color="#000000"
                    fontFamily="Work Sans,sans-serif"
                    fontWeight={500}
                    fontSize={12}
                  >
                    Brylin, USA
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
                  <TimeIcon fill="#979797B0" />
                  <Typography
                    color="#000000"
                    fontFamily="Inter,sans-serif"
                    fontWeight={300}
                    fontSize={12}
                  >
                    Jun 2020 - April 2021- 1 Years
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  </Box>
);
