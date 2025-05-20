import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, IconButton, InputAdornment, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthContext } from 'src/auth/useAuthContext';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/FormProvider';
import Iconify from 'src/components/iconify';
import usePostRequest from 'src/hooks/usePost';
import { StyledContent, StyledRoot } from 'src/layouts/login/styles';
import { pxToRem } from 'src/theme/typography';
import * as Yup from 'yup';
import { useSnackbar } from 'src/components/snackbar';
import { useSearchParams } from 'next/navigation';
import Head from 'next/head';

type FormValuesProps = {
  password: string;
  confirmPassword: string;
};

const ResetPassword = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const searchParams = useSearchParams();

  console.log('searchParams', searchParams);

  const token = searchParams.get('token');

  console.log('token', token);

  const LoginSchema = Yup.object().shape({
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match') // Removed null
      .required('Confirm Password is required'),
  });

  const defaultValues = {
    password: '',
    confirmPassword: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const resetPasswordMutation = usePostRequest<{ newPassword: string; token: string | null }>();

  const onSubmit = async (data: FormValuesProps) => {
    const url = '/auth/reset-password';

    resetPasswordMutation.mutate(
      [
        url,
        {
          token,
          newPassword: data?.password,
        },
      ],
      {
        onSuccess: (response: any) => {
          // Handle success
          enqueueSnackbar(response?.message || 'Reset password email sent successfully', {
            variant: 'success',
          });
          router.push('/login');
          console.log('Success:', response);
        },
        onError: (error: any) => {
          // Handle error
          enqueueSnackbar(error.message, { variant: 'error' });
          console.error('Error:', error);
        },
      }
    );
  };

  return (
    <>
      <Head>
        <title>Reset password</title>
      </Head>
      <StyledRoot
        // sx={{
        //   backgroundImage: `url(${'/assets/rag-dolls-one-blue_1.png'})`,
        //   backgroundRepeat: 'no-repeat',
        //   backgroundSize: 'cover',
        //   backgroundPosition: 'center',
        // }}
      >
        <StyledContent
          sx={{
            width: 650,
            minHeight: 'auto',
          }}
        >
          <Box
            sx={{
              paddingX: 8,
              paddingY: 4,
              // boxShadow: open ? '0px 4px 4px 0px #00000040' : '0px 4px 4px 0px #00000040',
              // background: open ? '#6D88C24D' : '#FFFFFFB5',
            }}
            borderRadius="12px"
            width="100%"
          >
            <Stack spacing={1} sx={{ mb: 2, position: 'relative' }}>
              <Box
                width="100%"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                display="flex"
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    // fontFamily: 'Outfit',
                    color: '#1C2F41',
                    fontSize: pxToRem(40),
                    lineHeight: 1,
                  }}
                >
                  {/* {open ? 'Reset Account' : 'Reset Your'} */}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 600,
                    // fontFamily: 'Outfit',
                    color: '#000',
                    fontSize: pxToRem(40),
                    lineHeight: 1,
                    paddingBottom: 6,
                  }}
                >
                  Enter your new password
                </Typography>
              </Box>
            </Stack>

            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2} mb={4} mt={open ? 2 : 1}>
                {!open && (
                  <Typography
                    fontSize={14}
                    fontWeight={400}
                    fontFamily="Work Sans, sans-serif"
                    color="#03133C"
                  >
                    If you forgot your email address
                  </Typography>
                )}
                {open ? (
                  <>
                    <RHFTextField
                      name="password"
                      formlabel="New Password*"
                      hiddenLabel
                      type={showPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                              <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiInputBase-root': {
                          background: '#FFF',
                        },
                      }}
                    />
                    <RHFTextField
                      name="confirmPassword"
                      formlabel="Confirm Password: *"
                      hiddenLabel
                      type={showPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                              <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiInputBase-root': {
                          background: '#FFF',
                        },
                      }}
                    />
                  </>
                ) : (
                  <>
                    <RHFTextField
                      formlabel="Email Address / Contact Number: *"
                      hiddenLabel
                      name="email"
                      placeholder="Enter Your Email ID or Contact Number"
                    />
                    <Typography
                      fontSize={12}
                      fontWeight={600}
                      color="#0000005C"
                      fontFamily="Work Sans, sans-serif"
                    >
                      We will send you an email that will allow you to reset your password.
                    </Typography>
                  </>
                )}
              </Stack>

              <Box display="flex" justifyContent="center">
                {open ? (
                  <LoadingButton
                    color="inherit"
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={resetPasswordMutation.isLoading}
                    sx={{
                      bgcolor: '#0a2239',
                      color: (theme) =>
                        theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                      '&:hover': {
                        bgcolor: '#0a2239',
                        color: (theme) =>
                          theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                      },
                      fontWeight: 700,
                      fontFamily: 'Work Sans, sans-serif',
                      fontSize: 18,
                    }}
                  >
                    Reset Password
                  </LoadingButton>
                ) : (
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      bgcolor: '#0a2239',
                      color: (theme) =>
                        theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                      '&:hover': {
                        bgcolor: '#0a2239',
                        color: (theme) =>
                          theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                      },
                      fontWeight: 700,
                      fontFamily: 'Work Sans, sans-serif',
                      fontSize: 18,
                    }}
                    onClick={() => setOpen(true)}
                  >
                    Reset Password
                  </Button>
                )}
              </Box>
              <Typography
                sx={{
                  paddingTop: 2,
                  color: open ? '#000' : '#6D88C2',
                  fontWeight: 600,
                  fontSize: pxToRem(12),
                  fontFamily: 'Work Sans,sans-serif',
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => router.push('/login')}
              >
                Back to Login
              </Typography>
            </FormProvider>
          </Box>
        </StyledContent>
      </StyledRoot>
    </>
  );
};

export default ResetPassword;
