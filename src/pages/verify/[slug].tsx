// next
import Head from 'next/head';
import NextLink from 'next/link';
// @mui
import { Box, Link, Typography } from '@mui/material';
import { pxToRem } from 'src/theme/typography';


// assets
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AuthVerifyCodeForm from 'src/auth/AuthVerifyCodeForm';
import Iconify from 'src/components/iconify';
import { PATH_AUTH } from 'src/routes/paths';
import LoginLayout from 'src/layouts/login/LoginLayout';
import { GetStaticPaths, GetStaticProps } from 'next';
import usePostRequest from 'src/hooks/usePost';
import { useSnackbar } from 'src/components/snackbar';

export default function VerifyCodePage({ email }: any) {
  const postReq = usePostRequest();
  const { enqueueSnackbar } = useSnackbar();
  const handleResetOtp = () => {
    postReq.mutate(['/auth/resend-verification-email', { email }], {
      onSuccess: (response: any) => {
        // Handle success
        enqueueSnackbar(response?.message || 'Resend otp successfully', {
          variant: 'success',
        });
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
        <title> Verify your email</title>
      </Head>

      <LoginLayout bgColor="#FFF">
        <Box
          sx={{
            padding: 4,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            // boxShadow: 4,
          }}
          // borderRadius="12px"
          // bgcolor="rgba(255, 255, 255, 0.71)"
        >
          <MailOutlineIcon
            sx={{
              fontSize: pxToRem(120),
              lineHeight: 1,
              color: '#ffbb00',
              paddingBottom: 2,
            }}
          />
          <Typography variant="h3" paragraph>
            Please check your email!
          </Typography>

          <Typography sx={{ color: 'text.secondary', mb: 5, textAlign: 'center' }}>
            We have emailed a 6-digit confirmation code to {email}, please enter the code in below
            box to verify your email.
          </Typography>

          <AuthVerifyCodeForm email={email} />

          <Typography variant="body2" sx={{ my: 3, textAlign: 'center' , color: '#000'}}>
            Don't have a code? &nbsp;
            <Link
              variant="subtitle2"
              sx={{ color: '#ffbb00', textDecoration: 'underline' }}
              onClick={() => {
                handleResetOtp();
              }}
            >
              Resend code
            </Link>
          </Typography>

          <Link
            component={NextLink}
            href={PATH_AUTH.login}
            color="inherit"
            variant="subtitle2"
            sx={{
              mx: 'auto',
              alignItems: 'center',
              display: 'inline-flex',
            }}
          >
            <Iconify icon="eva:chevron-left-fill" width={16} />
            Return to sign in
          </Link>
        </Box>
      </LoginLayout>
    </>
  );
}

const decodeBase64 = (encoded: string) => {
  try {
    return atob(encoded); // Decodes the Base64 string
  } catch (error) {
    console.error('Error decoding Base64 slug:', error);
    return '';
  }
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
});

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const email = params?.slug ? decodeBase64(params.slug as string) : null;

  return { props: { email } };
};
