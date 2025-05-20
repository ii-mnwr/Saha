import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Rating,
  Box,
  CardHeader,
  Stack,
} from '@mui/material';
import Markdown from '../markdown';
import { fDate } from 'src/utils/formatTime';

const ExperienceListing = ({ data }: any) => (
  <Card
    // sx={{
    //   boxShadow: '2px 2px 4px 0px #6D88C2',
    //   background: '#FEFEFE',
    // }}
  >
    {console.log('datadatadata', data)}
    {/* <CardHeader
      title="Experience :"
      sx={{
        color: '#162144',
        fontFamily: 'Work Sans,sans-serif',
        fontSize: 20,
        fontWeight: 700,
      }}
    /> */}

    <CardContent>
      <Stack spacing={1}>
        {data?.map((item: any, index: number) => {
          const sDate = new Date(item?.startDate);
          const eDate = new Date(item?.endDate);
          const sMonth = sDate.toLocaleString('default', { month: 'long' });
          const eMonth = eDate.toLocaleString('default', { month: 'long' });
          return (
            <Box>
              <Typography
                sx={{
                  fontWeight: 700,
                  color: '#000',
                  fontSize: 18,
                  fontFamily: 'Work Sans,sans-serif',
                }}
              >
                {item?.position}
              </Typography>
              <Typography
                sx={{
                  fontWeight: 700,
                  color: '#000',
                  fontSize: 16,
                  fontFamily: 'Work Sans,sans-serif',
                  // paddingLeft: 2,
                  my: 1,
                }}
              >
                {item?.company} {fDate(item?.startDate)} -{' '}
                {item?.currently_working ? 'Present' : fDate(item?.endDate)}
              </Typography>

              {item?.description && (
                <Markdown>{item?.description}</Markdown>
                // <Box
                //   component="li"
                //   sx={{
                //     paddingLeft: 2,
                //     fontWeight: 500,
                //     color: '#000',
                //     fontSize: 16,
                //     fontFamily: 'Work Sans,sans-serif',
                //   }}
                // >
                //   {item?.description}
                // </Box>
              )}
            </Box>
          );
        })}
      </Stack>
    </CardContent>
  </Card>
);

export default ExperienceListing;
