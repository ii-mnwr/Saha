/* eslint-disable no-nested-ternary */
import {
  Box,
  Button,
  Card,
  CardMedia,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  Link,
  OutlinedInput,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import FormProvider from 'src/components/hook-form/FormProvider';
import RHFOutlinedInput from 'src/components/custom-components/OutLinedInput';
import useScreenSizes from '../../hooks/useScreenSizes';

const SignUp = () => {
  const { isMobile, isTablet, isLaptop, isLaptopL, isMobileM, isMobileL } = useScreenSizes();
  const [userRole, setUserRole] = React.useState('employee');
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setUserRole(event.target.value);
  };

  return (
    <Box component="div" bgcolor="#D6E3FF" paddingY={10}>
      <Container>
        <Card
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            width: '100%',
            border: '3px #85B6FF solid',
          }}
        >
          <Box display="flex" flexDirection="column" pt={3} width="100%">
            <Box display="flex" justifyContent="center">
              <Box>
                <Typography variant={isTablet ? 'h3' : 'h2'} color="#0083FF">
                  Create Account
                </Typography>
                <Box display="flex" justifyContent="center" marginY={1}>
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      defaultValue={userRole}
                      value={userRole}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="employee"
                        control={<Radio color="info" />}
                        label="Employee"
                      />
                      <FormControlLabel
                        value="candidate"
                        control={<Radio color="info" />}
                        label="Candidate"
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
                <Divider sx={{ marginX: 5 }} />
              </Box>
            </Box>
            <Container>
              <Box>
                <FormProvider methods="" onSubmit={() => { }}>


                  <RHFOutlinedInput fullWidth variant='standard' type='text' label='Full name:' placeholder="Enter Your User Name" required />
                  <RHFOutlinedInput fullWidth variant='standard' type='email' label='Email:' placeholder="Enter Your Email Address" required />
                  <RHFOutlinedInput fullWidth variant='standard' type={showPassword ? 'text' : 'password'} label='Password:' placeholder="Enter Your Password" endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  } required />
                  <RHFOutlinedInput fullWidth variant='standard' type={showPassword ? 'text' : 'password'} label='Confirm Password:' placeholder="Re-Ennter Your Password" endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  } required />

                  {userRole === 'employee' ? (
                    <>
                      <RHFOutlinedInput fullWidth variant='standard' type='text' label='Company Name:' placeholder="Enter Your Company Name" required />

                      <Stack direction={isTablet ? 'column' : 'row'} spacing={isTablet ? 0 : 8}>
                        <RHFOutlinedInput fullWidth variant='standard' type='text' label='Company Location:' placeholder="Enter Location" required={false} />
                        <RHFOutlinedInput fullWidth variant='standard' type='text' label='Designation at company:' placeholder="Designation Name" required />
                      </Stack>
                    </>
                  ) : (
                    <>
                      <RHFOutlinedInput fullWidth variant='standard' type='number' label='Mobile Number:' placeholder="Enter Your Mobile Number" required />
                      <RHFOutlinedInput fullWidth variant='standard' type='' label='Upload Your Resume:' placeholder="File in .pdf or .doc" required
                        disabled
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton aria-label="file upload" edge="end">
                              <CreateNewFolderOutlinedIcon />
                            </IconButton>
                          </InputAdornment>
                        }
                      />

                      <Box>
                        <FormControlLabel
                          sx={{ color: '#6D88C2' }}
                          control={<Checkbox color="info" />}
                          label="Remember Me"
                        />
                      </Box>
                    </>
                  )}
                  <Box display="flex" justifyContent="center" mt={isTablet ? 8 : 10}>
                    <Button
                      variant="outlined"
                      sx={{ borderRadius: 20, paddingX: 5 }}
                      endIcon={<KeyboardDoubleArrowRightIcon />}
                      type="submit"
                    >
                      <Typography variant="h5">Register</Typography>
                    </Button>
                  </Box>
                </FormProvider>

              </Box>
            </Container>
            <Container>
              <Box display="flex" justifyContent="center" textAlign="center" mt={isTablet ? 4 : 13}>
                <Typography color="#0a2239">
                  If you already have an account?
                  <Link href="/" underline="none" ml={1} color="#03133C">
                    click here for Login
                  </Link>
                </Typography>
              </Box>
            </Container>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: isTablet ? 450 : 500, height: '100%' }}
            image={
              userRole === 'employee'
                ? '/assets/signUpImages/sign_up_employee.png'
                : '/assets/signUpImages/sign_up_candidate.png'
            }
            alt="Sign-Up"
          />
        </Card>
      </Container>
    </Box>
  );
};

export default SignUp;
