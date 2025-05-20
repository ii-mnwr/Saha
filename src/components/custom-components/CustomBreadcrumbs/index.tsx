import React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Box from '@mui/material/Box';
import { Divider, Link } from '@mui/material';

interface CustomBreadcrumbsProps {
  currentPage: string;
  title?: string;
}

const CustomBreadcrumbs: React.FC<CustomBreadcrumbsProps> = ({ currentPage, title }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', fontFamily: 'Arial, sans-serif' }}>
      <Typography
        color="#6D88C2"
        fontWeight={500}
        fontSize={20}
        fontFamily="Work Sans,sans-serif"
        sx={{ mr: 2 }}
      >
        {title || 'Hello, Joy !'}
      </Typography>
      <Box
        sx={{
          borderLeft: '1px solid #6D88C2',
          height: 20,
          paddingLeft: 1,
        }}
      />
      <Breadcrumbs
        aria-label="breadcrumb"
        separator=">"
        sx={{
          '& .MuiTypography-root': { fontWeight: 'bold' },
        }}
      >
        <Link href="/" underline="none">
          <Typography
            color="#6D88C2"
            sx={{
              textDecoration: 'none',
              '&.MuiTypography-root': {
                fontWeight: 300,
                fontFamily: 'Work Sans,sans-serif',
              },
            }}
          >
            Home
          </Typography>
        </Link>
        <Typography
          sx={{
            '&.MuiTypography-root': {
              fontWeight: 300,
              color: '#6D88C2',
              fontFamily: 'Work Sans,sans-serif',
              fontSize: 15,
            },
          }}
        >
          {currentPage}
        </Typography>
      </Breadcrumbs>
    </Box>
  );

export default CustomBreadcrumbs;
