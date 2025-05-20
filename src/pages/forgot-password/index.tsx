import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Icon, IconButton, InputAdornment, Stack, Typography } from '@mui/material';
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
import HelpIcon from '@mui/icons-material/Help';
import * as Yup from 'yup';
import { useSnackbar } from 'src/components/snackbar';
import Head from 'next/head';

type FormValuesProps = {
  email: string;
};

const ForgotPassword = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  });

  const defaultValues = {
    email: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const resetPasswordMutation = usePostRequest<{ email: string }>();

  const onSubmit = async (data: FormValuesProps) => {
    console.log('data', data);
    const url = '/auth/reset-password/request';

    resetPasswordMutation.mutate([url, data], {
      onSuccess: (response: any) => {
        // Handle success
        enqueueSnackbar(response?.message || 'Reset password email sent successfully', {
          variant: 'success',
        });
        router.push('/login');
      },
      onError: (error: any) => {
        // Handle error
        enqueueSnackbar(error.message, { variant: 'error' });
      },
    });
  };

  return (
    <>
      <Head>
        <title>Forgot password</title>
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
              background: open ? '#6D88C24D' : '#FFFFFFB5',
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
                <HelpIcon
                  sx={{
                    fontSize: pxToRem(120),
                    lineHeight: 1,
                    color: '#ffbb00',
                    paddingBottom: 2,
                  }}
                />
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
                    fontFamily: 'Archivo, sans-serif',
                    color: '#000',
                    fontSize: pxToRem(40),
                    lineHeight: 1,
                  }}
                >
                  Forgot Password ?
                </Typography>
              </Box>
            </Stack>

            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Typography fontWeight={600} fontFamily="Work Sans, sans-serif" fontSize={16}>
                {/* {open
                  ? `Strong Password Include Numbers, Letters, Punctuation Marks.
                    `
                  : `Enter your email address to retrieve password`} */}
              </Typography>

              <Stack spacing={2} mb={4} mt={open ? 2 : 1}>
                {!open && (
                  <Typography
                    fontSize={16}
                    fontWeight={400}
                    fontFamily="Archivo, sans-serif"
                    color="#000"
                    textAlign="center"
                  >
                    Don't worry, we can help !
                  </Typography>
                )}
                {open ? (
                  <>
                    <RHFTextField
                      name="password"
                      formlabel="New Password : *"
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
                      formlabel="Email"
                      hiddenLabel
                      name="email"
                      placeholder="Enter Your Email ID"
                    />
                    <Typography
                      fontSize={12}
                      fontWeight={600}
                      color="#0000005C"
                      fontFamily="Work Sans, sans-serif"
                      textAlign="center"
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
                      bgcolor: '#0B91FF',
                      color: (theme) =>
                        theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                      '&:hover': {
                        bgcolor: '#0B91FF',
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
                )}
              </Box>
              <Typography
                sx={{
                  paddingTop: 2,
                  color: open ? '#FFF' : '#000',
                  fontWeight: 400,
                  fontSize: pxToRem(12),
                  fontFamily: 'Work Sans,sans-serif',
                  textAlign: 'center',
                  cursor: 'pointer',
                  textDecoration: 'underline',
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

export default ForgotPassword;
