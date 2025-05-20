import { Avatar, Box, Chip, Divider, Stack, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import AddIcCallOutlinedIcon from '@mui/icons-material/AddIcCallOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { LocationIcon, TimeIcon } from 'src/theme/overrides/CustomIcons';
import Markdown from '../markdown/Markdown';

function calculateExperience(joiningDate: any, endDate: any) {
  const start = moment(joiningDate);
  const end = moment(endDate);

  // Calculate the difference in years and months
  const years = end.diff(start, 'years');
  start.add(years, 'years');

  const months = end.diff(start, 'months');

  return { years, months };
}

const Template4 = React.forwardRef<any, any>((props, ref) => {
  const { data } = props;

  return (
    /*  <Box ref={ref} sx={{ padding: 20, backgroundColor: '#f5f5f5' }}> */
    <Box
      ref={ref}
      sx={{
        border: '1px solid #000',
        padding: 2,
        width: '100%',
        maxWidth: '794px',
        maxHeight: '1123px',
        height: '100vh',
        overflow: 'scroll',
      }}
    >
      <Stack spacing={2}>
        <Box>
          <Typography
            sx={{
              color: '#1f618d',
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            {data?.first_name ? data?.first_name : 'George'}{' '}
            {data?.last_name ? data?.last_name : 'Well'}
          </Typography>
          {/* <Typography
              sx={{
                color: '#000',
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              Job title
            </Typography> */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 1,
            }}
          >
            <Typography>{data?.phone ? data?.phone : '+44 7123 243 7890'}</Typography>
            <Divider
              orientation="vertical"
              variant="fullWidth"
              flexItem
              sx={{ borderColor: '#000' }}
            />
            <Typography>{data?.email ? data?.email : 'info@talentsreach.com'}</Typography>
          </Box>
        </Box>
        <Box>
          <Typography
            sx={{
              color: '#1f618d',
              fontSize: 20,
              fontWeight: 500,
            }}
          >
            Profile summary
          </Typography>
          <Typography>
            {data?.personal_summary
              ? data?.personal_summary
              : `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s, when anunknown printer took.`}
          </Typography>
        </Box>

        <Box>
          <Typography
            sx={{
              color: '#1f618d',
              fontSize: 20,
              fontWeight: 500,
            }}
          >
            Skills
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              paddingX: 1,
              paddingY: 2,
              flexWrap: 'wrap',
            }}
          >
            {data?.skills?.length > 0 ? (
              data?.skills?.map((skill: any) => (
                <Chip
                  label={skill}
                  sx={{
                    background: '#1f618d',
                    color: '#fff',
                    fontWeight: 500,
                    fontSize: 14,
                  }}
                  variant="filled"
                />
              ))
            ) : (
              <Chip
                label="Html"
                sx={{
                  background: '#1f618d',
                  color: '#fff',
                  fontWeight: 500,
                  fontSize: 14,
                }}
                variant="filled"
              />
            )}
          </Box>
        </Box>
        <Box>
          <Typography
            sx={{
              color: '#1f618d',
              fontSize: 20,
              fontWeight: 500,
            }}
          >
            Experience
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
            {data?.experience_details?.map((item: any) => (
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 1,
                  }}
                >
                  <Typography
                    sx={{
                      color: '#000',
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                  >
                    {item?.company ? item?.company : 'Coding Agency'}, Hicks St Brooklyn, NY
                  </Typography>
                  <Typography
                    sx={{
                      color: '#000',
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                  >
                    {item?.startDate
                      ? moment(item?.startDate, 'YYYY-MM-DD').format('MMM YYYY')
                      : 'Jun 2017'}
                    {'-'}{' '}
                    {item?.endDate
                      ? moment(item?.endDate, 'YYYY-MM-DD').format('MMM YYYY')
                      : 'Apr 2020'}
                  </Typography>
                </Box>
                <Box paddingTop={1}>
                  <Markdown>
                    {item?.description
                      ? item?.description
                      : '<p><strong style="color: rgb(66, 66, 66);">Job responsibilities: </strong></p><ul><li><span style="color: rgb(66, 66, 66);">Lead a team</span></li></ul>'}
                  </Markdown>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        <Box>
          <Typography
            sx={{
              color: '#1f618d',
              fontSize: 20,
              fontWeight: 500,
            }}
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
            {data?.education_details?.map((item: any) => (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 1,
                }}
              >
                <Typography
                  sx={{
                    color: '#000',
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  {item?.institute ? item?.institute : 'Harvard University'}, Hicks St Brooklyn, NY,
                  {item?.degree ? item?.degree : 'Bachelor in Software Engineering'}
                </Typography>

                <Typography
                  sx={{
                    color: '#000',
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  {item?.startDate
                    ? moment(item?.startDate, 'YYYY-MM-DD').format('MMM YYYY')
                    : 'Jun 2017'}
                  {'-'}{' '}
                  {item?.endDate
                    ? moment(item?.endDate, 'YYYY-MM-DD').format('MMM YYYY')
                    : 'Apr 2020'}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Stack>
    </Box>
    /*  </Box> */
  );
});

export default Template4;
