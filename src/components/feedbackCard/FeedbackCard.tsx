import React from 'react';
import { Card, CardContent, Typography, Avatar, Rating, Box } from '@mui/material';
import { fToNow } from 'src/utils/formatTime';

const TestimonialCard = ({ item }: any) => (
  <Card sx={{ boxShadow: 'none', backgroundColor: 'transparent', border: '1px solid #C7D1E8' }}>
    <CardContent
      sx={{
        display: 'fex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Typography
        sx={{
          fontWeight: 600,
          color: '#000',
          fontFamily: 'Inter,sans-serif',
          fontSize: 20,
        }}
      >
        {item?.title}
      </Typography>
      <Typography
        sx={{
          fontWeight: 400,
          color: '#000',
          fontFamily: 'Inter,sans-serif',
          fontSize: 16,
        }}
      >
        {item?.comment}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          mt: 1,
          gap: 2,
        }}
      >
        <Avatar
          src="/path-to-user-image.jpg"
          alt={item?.candidate?.user_name}
          sx={{
            width: 60,
            height: 60,
            border: '1px solid #6D88C24D',
          }}
        />
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: 13,
              fontFamily: 'Work Sans,sans-serif',
              color: '#000',
            }}
          >
            {item?.candidate?.user_name}
          </Typography>
          <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
            <Rating
              name="read-only"
              // eslint-disable-next-line no-unsafe-optional-chaining
              value={
                (item?.user_rating +
                  item?.system_rating +
                  item?.system_service +
                  item?.recommend_others || 0) / 4
              }
              readOnly
            />
            <Typography
              fontFamily="Work Sans,sans-serif"
              fontSize={13}
              fontWeight={300}
              color="#000"
            >
              {fToNow(item?.updatedAt)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export default TestimonialCard;
