import React from 'react';
import { Card, CardContent, Typography, Grid, IconButton, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const CompanyOverviewCard = ({ companyDetails }: any) => {
  console.log('companyDetails', companyDetails);
  // You can replace these URLs with the actual URLs for the company's social media
  const socialLinks = {
    Facebook: 'https://facebook.com',
    LinkedIn: 'https://linkedin.com',
    Instagram: 'https://instagram.com',
  };

  return (
    <Card
      sx={{
        minWidth: 275,
        borderRadius: '16px',
        boxShadow: '2px 2px 4px 0px #6D88C2',
        background: '#FEFEFE',
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          COMPANY OVERVIEW
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography sx={{ fontSize: 14 }}>Categories:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ fontSize: 14 }}>{companyDetails?.company_category}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ fontSize: 14 }}>Established:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ fontSize: 14 }}>{companyDetails?.est_since}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ fontSize: 14 }}>Employees:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ fontSize: 14 }}>{companyDetails?.team_size}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ fontSize: 14 }}>Location:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ fontSize: 14 }}>{companyDetails?.location}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ fontSize: 14 }}>Phone Number:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ fontSize: 14 }}>{companyDetails?.contact_number}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ fontSize: 14 }}>Email:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ fontSize: 14 }} style={{ wordWrap: 'break-word' }}>
              {companyDetails?.email}
            </Typography>
          </Grid>
          {/* <Grid item xs={6}>
            <Typography sx={{ fontSize: 14 }}>Socials:</Typography>
          </Grid>
          <Grid item xs={6}>
            {Object.keys(socialLinks).map((network) => (
              <IconButton
                key={network}
                href={socialLinks[network as keyof typeof socialLinks] as string}
                target="_blank"
              >
                {network === 'Facebook' && <FacebookIcon />}
                {network === 'LinkedIn' && <LinkedInIcon />}
                {network === 'Instagram' && <InstagramIcon />}
              </IconButton>
            ))}
          </Grid> */}
          <Grid item xs={12}>
            <Link
              href={companyDetails?.data?.company?.website}
              target="_blank"
              sx={{ textDecoration: 'none' }}
            >
              <Typography variant="body1" color="primary">
                {companyDetails?.data?.company?.website}
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CompanyOverviewCard;
