import React from 'react';
import { Card, CardContent, Typography, Link, Divider, Button, Box } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import WebIcon from '@mui/icons-material/Web';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const CompanyOverviewCard = () => {
  console.log('');

  return (
    <Box sx={{ paddingTop: 2 }}>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            <Button variant="contained">Edit Profile</Button>
          </Box>
          <Typography variant="h6" my={1.5} component="div">
            COMPANY OVERVIEW
          </Typography>
          {/* <Divider sx={{ my: 1.5 }} /> */}
          <Typography color="text.secondary">Categories: Application</Typography>
          <Typography color="text.secondary">Established: 1986</Typography>
          <Typography color="text.secondary">Employees: 75</Typography>
          <Typography color="text.secondary">Location: New York</Typography>
          <Typography color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
            <PhoneIcon sx={{ mr: 0.5 }} /> +44 7655 897987
          </Typography>
          <Typography color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
            <EmailIcon sx={{ mr: 0.5 }} /> info@info@talentsreach.com.com
          </Typography>
          <Link href="#" sx={{ display: 'flex', alignItems: 'center' }}>
            <WebIcon sx={{ mr: 0.5 }} /> www.talentsreach.com
          </Link>
          {/* <Divider sx={{ my: 1.5 }} /> */}
          <Typography
            color="text.secondary"
            my={1.5}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
          >
            <FacebookIcon color="primary" sx={{ mr: 0.5 }} />
            <LinkedInIcon color="primary" sx={{ mr: 0.5 }} />
            <InstagramIcon color="primary" sx={{ mr: 0.5 }} />
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CompanyOverviewCard;
