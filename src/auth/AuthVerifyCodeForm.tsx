import * as Yup from 'yup';
// next
import { useRouter } from 'next/router';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import FormProvider from 'src/components/hook-form/FormProvider';
import { RHFCodes } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import usePostRequest from 'src/hooks/usePost';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { useAuthContext } from './useAuthContext';

// ----------------------------------------------------------------------

type FormValuesProps = {
  code1: string;
  code2: string;
  code3: string;
  code4: string;
  code5: string;
  code6: string;
};

export default function AuthVerifyCodeForm({ email }: any) {
  const postReq = usePostRequest();
  const { login } = useAuthContext();
  const { push, back } = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.string().required('Code is required'),
    code2: Yup.string().required('Code is required'),
    code3: Yup.string().required('Code is required'),
    code4: Yup.string().required('Code is required'),
    code5: Yup.string().required('Code is required'),
    code6: Yup.string().required('Code is required'),
  });

  const defaultValues = {
    code1: '',
    code2: '',
    code3: '',
    code4: '',
    code5: '',
    code6: '',
  };

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const obj = {
        otp: Object.values(data).join(''),
        email,
      };
      postReq.mutate(['/auth/verify-email', obj], {
        onSuccess: async (response: any) => {
          // Handle success
          enqueueSnackbar(response?.message || 'Otp send successfully', {
            variant: 'success',
          });
          const loginData = JSON.parse(localStorage.getItem('data') || '{}');
          const res: any = await login(loginData);
          if (loginData?.role_id === 2) {
            push(PATH_DASHBOARD.employee.dashboard);
            localStorage.removeItem('data');
          }
          if (loginData.role_id === 3) {
            push(PATH_DASHBOARD.candidate.dashboard);
            localStorage.removeItem('data');
          }
        },
        onError: (error: any) => {
          enqueueSnackbar(error.message, { variant: 'error' });
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFCodes keyName="code" inputs={['code1', 'code2', 'code3', 'code4', 'code5', 'code6']} />

        {(!!errors.code1 ||
          !!errors.code2 ||
          !!errors.code3 ||
          !!errors.code4 ||
          !!errors.code5 ||
          !!errors.code6) && (
          <FormHelperText error sx={{ px: 2 }}>
            Code is required
          </FormHelperText>
        )}

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ mt: 3 , backgroundColor: '#0a2239'}}
        >
          Verify
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
