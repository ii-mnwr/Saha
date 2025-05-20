import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Stack,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import FlagIcon from '@mui/icons-material/Flag'; // You can use flag icons from a library like 'react-flag-icon-css' instead
import { DatePicker, LoadingButton, LocalizationProvider } from '@mui/lab';
import usePostRequest from 'src/hooks/usePost';
import { useSnackbar } from 'src/components/snackbar';

function hasEmptyValue(obj: any) {
  // Iterate over the object's values
  return Object.values(obj).some(
    (value) =>
      // Check if the value is empty
      value === '' || value === null || value === undefined
  );
}

const HelpForm = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [formValues, setFormValues] = useState({
    firstName: '',
    email: '',
    contactNumber: '',
    date: '',
    timeSlot: '',
  });

  const handleChange = (event: any) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const contactUs = usePostRequest();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(formValues, 'formValues');
    if (hasEmptyValue(formValues)) {
      enqueueSnackbar('Please fill all the fields', { variant: 'error' });
      return;
    }

    // Handle form submission, such as sending data to a backend server
    const url = '/support/contact';

    contactUs.mutate(
      [
        url,
        {
          fullName: formValues?.firstName,
          phoneNumber: formValues?.contactNumber,
          email: formValues?.email,
          inquiry: `Need a HELP from Experts: Time  - ${formValues?.date} and Slot - ${formValues?.timeSlot}`,
        },
      ],
      {
        onSuccess: (response: any) => {
          // Handle success
          enqueueSnackbar(response?.message || 'Sent successfully!!', {
            variant: 'success',
          });
          setFormValues({
            firstName: '',
            email: '',
            contactNumber: '',
            date: '',
            timeSlot: '',
          });
        },
        onError: (error: any) => {
          // Handle error
          enqueueSnackbar(error.message, { variant: 'error' });
        },
      }
    );
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mt: 4, mb: 4, backgroundColor: 'white', borderRadius: 2, p: 4, boxShadow: 3 }}>
        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom>
            Need a HELP from our Experts??
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              required
              fullWidth
              name="firstName"
              label="Full Name"
              value={formValues.firstName}
              onChange={handleChange}
              margin="normal"
            />

            <TextField
              required
              fullWidth
              name="email"
              label="Email Address"
              value={formValues.email}
              onChange={handleChange}
              margin="normal"
            />
            <Stack direction="row" spacing={2} sx={{ mt: 2 }} alignItems="flex-end">
              {/* <IconButton>
                <FlagIcon />
              </IconButton> */}
              <TextField
                required
                fullWidth
                name="contactNumber"
                label="Contact Number"
                value={formValues.contactNumber}
                onChange={handleChange}
                margin="normal"
              />
            </Stack>

            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date"
              value={formValues.date}
              onChange={handleDateChange}
              renderInput={(params: any) => <TextField {...params} fullWidth margin="normal" />}
            />
          </LocalizationProvider> */}
            <TextField
              fullWidth
              // size="small"
              placeholder="Date"
              type="date"
              name="date"
              onChange={handleChange}
              value={formValues.date}
              sx={{ mt: 2 }}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel id="time-slot-label">Select Time Slot</InputLabel>
              <Select
                labelId="time-slot-label"
                id="time-slot"
                name="timeSlot"
                value={formValues.timeSlot}
                label="Select Time Slot"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="morning">Morning</MenuItem>
                <MenuItem value="afternoon">Afternoon</MenuItem>
                <MenuItem value="evening">Evening</MenuItem>
              </Select>
            </FormControl>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={contactUs?.isLoading}
            >
              Submit Now
            </LoadingButton>
          </Box>
        </Container>
      </Box>
    </Container>
  );
};

export default HelpForm;
