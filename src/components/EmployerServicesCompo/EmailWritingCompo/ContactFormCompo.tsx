import { Box, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useEmployeeServices } from 'src/hooks/useEmployeeServices';
import { PhoneAndroidOutlined as PhoneIcon } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

const ContactFormCompo = () => {
  const { sendEmailApplication, sendEmail } = useEmployeeServices();
  const [contactFormData, setContactFormData] = useState({
    subject: '',
    contact_number: '',
    body: '',
  });
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const key = event.key;
    if (
      key === 'Backspace' ||
      key === 'Delete' ||
      key === 'Tab' ||
      key === 'Escape' ||
      key === 'Enter' ||
      key === '.' ||
      (key >= '0' && key <= '9')
    ) {
      return;
    }
    event.preventDefault();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (/^\d*$/.test(newValue)) {
      setContactFormData((data: any) => ({
        ...data,
        contact_number: event.target.value,
      }));
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
        <Box
          component="form"
          sx={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '5px',
            boxShadow: 3,
            border: '3px solid #85B6FF',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
          noValidate
          autoComplete="off"
        >
          <Typography
            sx={{
              color: '#086BFF',
              fontWeight: 700,
              fontSize: 24,
              fontFamily: 'Work Sans,sans-serif',
            }}
          >
            Get Helps from Our Experts !!!
          </Typography>

          <TextField
            required
            id="subject"
            label="Subject"
            placeholder="Enter Your Subject for Email"
            margin="normal"
            fullWidth
            variant="outlined"
            onChange={(e) =>
              setContactFormData((data: any) => ({
                ...data,
                subject: e.target.value,
              }))
            }
          />

          <TextField
            required
            id="contact_number"
            label="Contact Number"
            placeholder="+91"
            margin="normal"
            fullWidth
            variant="outlined"
            InputProps={{
              startAdornment: <PhoneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />,
            }}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
          />

          <TextField
            id="additional-information"
            label="Additional Information"
            placeholder="Write here addition information."
            multiline
            rows={4}
            margin="normal"
            fullWidth
            variant="outlined"
            onChange={(e) =>
              setContactFormData((data: any) => ({
                ...data,
                body: e.target.value,
              }))
            }
          />

          <LoadingButton
            variant="contained"
            sx={{
              bgcolor: '#85B6FF',
              color: '#000000',
              fontWeight: 500,
              fontSize: 14,
              fontFamily: 'Work Sans,sans-serif',
              ':hover': {
                bgcolor: '#85B6FF',
              },
            }}
            loading={sendEmail?.isLoading}
            onClick={() => sendEmailApplication(contactFormData)}
          >
            Submit Now
          </LoadingButton>
        </Box>
      </Container>
  );
};

export default ContactFormCompo;
