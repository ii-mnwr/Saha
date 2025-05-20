import { useEffect, useState } from 'react';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {
  Link,
  Stack,
  Alert,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Typography,
  FormGroup,
  Radio,
  FormControl,
  RadioGroup,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { LoadingButton } from '@mui/lab';
// auth
import { pxToRem } from 'src/theme/typography';
import { useRouter } from 'next/router';
import { useAuthContext } from '../../auth/useAuthContext';
// components
import Iconify from '../../components/iconify';
import FormProvider, { RHFTextField } from '../../components/hook-form';
import LoginAsModal from './LoginAsModal';
import { useSnackbar } from 'src/components/snackbar';

// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
  password: string;
  afterSubmit?: string;
  role_id?: any;
};

export default function AuthLoginForm() {
  const { enqueueSnackbar } = useSnackbar();
  const { login } = useAuthContext();
  const router = useRouter();
  const { query, pathname } = router;

  console.log('query', query?.role, query, pathname);

  const [roleId, setRoleId] = useState(null);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  // useEffect(() => {
  //   handleOpen();
  // }, []);

  // const [type, setType] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email Or ID is required'),
    // .email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
    // role_id: Yup.string().required('Login Type is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
    // role_id: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  // useEffect(() => {
  //   if (errors?.role_id?.message === 'Login Type is required') {
  //     handleOpen();
  //   }
  // }, [errors]);

  const onSubmit = async (data: FormValuesProps) => {
    console.log('role_id', data);
    setIsLoading(true);
    if (
      (query?.role === null || query?.role === '' || query?.role === undefined) &&
      pathname !== '/super-admin/login'
    ) {
      setIsLoading(false);
      handleOpen();
      return;
    }
    // console.log('datalogin', data);

    const payload = {
      email: data?.email,
      password: data?.password,
      role_id: pathname !== '/super-admin/login' ? Number(query?.role) : 1,
    };
    // console.log('payload', payload);
    try {
      const res: any = await login(payload);
      if (res?.employee?.is_verified === false && res?.role_id === 2) {
        enqueueSnackbar(
          'Your application is in process. Please wait for approval from Talentsreach. Thank you.',
          { variant: 'info' }
        );
      }
      console.log('res', res);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      console.error(error);

      reset();

      setError('afterSubmit', {
        ...error,
        message: error.message || error,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack
        sx={{
          marginBottom: 2,
        }}
      >
        {/* <Typography variant="body1" fontWeight="bold">
          Login as:
        </Typography> */}
        <FormControl>
          {/* <RadioGroup
            name="role_id"
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="employee"
            // name="radio-buttons-group"
            sx={{
              flexDirection: 'row',
            }}
          >
            <FormControlLabel
              // name="role_id"
              value="2"
              control={
                <Radio
                  onChange={(event) => {
                    // setType(Number(event.target.value));
                    setValue('role_id', event.target.value);
                  }}
                />
              }
              label="Employer"
            />
            <FormControlLabel
              // name="role_id"
              value="3"
              control={
                <Radio
                  onChange={(event) => {
                    // setType(Number(event.target.value));
                    setValue('role_id', event.target.value);
                  }}
                />
              }
              label="Candidate"
            />
          </RadioGroup> */}
          {/* {errors?.role_id && typeof errors?.role_id?.message === 'string' && (
            <Typography color="error" variant="body2" sx={{ mt: 0.2 }}>
              {errors?.role_id?.message}
            </Typography>
          )} */}
        </FormControl>
      </Stack>
      <Stack spacing={1}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField
          formlabel="Email or ID *"
          hiddenLabel
          name="email"
          fontWeight={500}
          placeholder="Enter Your Email or ID"
        />

        <RHFTextField
          name="password"
          formlabel="Password *"
          hiddenLabel
          placeholder="Enter Your Password"
          type={showPassword ? 'text' : 'password'}
          fontWeight={500}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {pathname !== '/super-admin/login' && (
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Remember Me" /> */}
          <Link variant="body2" href="/forgot-password" color="inherit" underline="always">
            Forgot password?
          </Link>
        </Stack>
      )}

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isLoading}
        sx={{
          marginTop: pathname === '/super-admin/login' ? 2 : 0,
          bgcolor: 'text.primary',
          color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          '&:hover': {
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          },
        }}
        // onClick={() => onSubmit()}
      >
        Login
      </LoadingButton>

      {pathname !== '/super-admin/login' && (
        <Typography
          sx={{
            paddingTop: 1,
            color: '#0A2239',
            fontWeight: 600,
            fontSize: pxToRem(14),
            // fontFamily: 'Work Sans',
            textAlign: 'center',
          }}
        >
          Don't Have an account?{' '}
          <span
            style={{
              color: '#ffbb00',
              cursor: 'pointer',
            }}
            aria-hidden="true"
            onClick={() => {
              router.push('/sign-up');
            }}
          >
            {' '}
            Sign up
          </span>
        </Typography>
      )}
      {open && (
        <LoginAsModal
          open={open}
          handleClose={handleClose}
          roleId={roleId}
          setRoleId={setRoleId}
          handleOpen={handleOpen}
          setValue={setValue}
        />
      )}
    </FormProvider>
  );
}
