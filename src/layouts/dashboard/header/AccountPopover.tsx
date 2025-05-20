import { useState } from 'react';
import { useRouter } from 'next/router';
import { 
  Box, 
  Divider, 
  Typography, 
  Stack, 
  MenuItem, 
  useMediaQuery, 
  useTheme 
} from '@mui/material';
import { DownArrowIcon } from 'src/theme/overrides/CustomIcons';
import { HOST_URL } from 'src/config-global';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { useAuthContext } from '../../../auth/useAuthContext';
import { CustomAvatar } from '../../../components/custom-avatar';
import { useSnackbar } from '../../../components/snackbar';
import MenuPopover from '../../../components/menu-popover';
import { IconButtonAnimate } from '../../../components/animate';

const candidateOption = [
  {
    label: 'Profile',
    linkTo: '/candidate/profile/',
  },
  {
    label: 'Manage Subscription',
    linkTo: '/manage-subscription',
  },
  {
    label: 'Upgrade your Plan',
    linkTo: '/upgrade',
  },
  {
    label: 'Settings',
    linkTo: '/settings',
  },
];

interface EmployeeOption {
  label: string;
  linkTo: string;
}

interface User {
  employee_id?: string;
}

const employeeOption = (user: User): EmployeeOption[] => [
  {
    label: 'Settings',
    linkTo: '/settings',
  },
  {
    label: 'Company Profile',
    linkTo: `/company/profile/${user?.employee_id}`,
  },
  {
    label: 'Manage Job',
    linkTo: '/manage-job',
  },
];

export default function AccountPopover() {
  const { replace, push } = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { user, logout } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();

  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleLogout = async () => {
    try {
      logout();
      replace(PATH_DASHBOARD.home);
      handleClosePopover();
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  const handleClickItem = (path: string): void => {
    handleClosePopover();
    push(path);
  };

  const getProfileImagePath = () => {
    return `${HOST_URL}${
      user?.candidate?.profile_image_path ??
      user?.employee?.company?.profile_image_path ??
      user?.company?.profile_image_path ??
      user?.employee?.profile_image_path ??
      ''
    }`;
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpenPopover}
        sx={{
          p: 0,
          ':hover': { background: 'none' },
          ':active': { background: 'none' },
          ':focus': { background: 'none' },
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          minWidth: 'auto',
          ...(openPopover && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'none',
              position: 'absolute',
            },
          }),
        }}
      >
        <CustomAvatar
          src={getProfileImagePath()}
          alt={user?.user_name}
          name={user?.user_name}
          sx={{ 
            width: { xs: 32, sm: 40 },
            height: { xs: 32, sm: 40 }
          }}
        />
        
        {!isMobile && (
          <>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: 14,
                color: '#6D88C2',
                maxWidth: 100,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              My Account
            </Typography>
            <Box sx={{ fontSize: 16 }}>
              <DownArrowIcon />
            </Box>
          </>
        )}
      </IconButtonAnimate>

      <MenuPopover 
        open={openPopover} 
        onClose={handleClosePopover} 
        sx={{ 
          width: { xs: 'calc(100vw - 32px)', sm: 220 },
          maxWidth: { xs: 'none', sm: 220 },
          p: 0,
          right: { xs: 16, sm: 'auto' },
          left: { xs: 'auto', sm: 'auto' },
          mt: { xs: 1, sm: 0.5 },
        }}
        anchorOrigin={{ 
          vertical: 'bottom', 
          horizontal: isMobile ? 'right' : 'right' 
        }}
        transformOrigin={{ 
          vertical: 'top', 
          horizontal: isMobile ? 'right' : 'right' 
        }}
      >
        <Box sx={{ 
          my: 1.5, 
          px: 2, 
          maxWidth: '100%',
          overflow: 'hidden'
        }}>
          <Typography 
            variant="subtitle2" 
            noWrap 
            sx={{ 
              fontSize: { xs: '0.875rem', sm: '1rem' },
              fontWeight: 600
            }}
          >
            {user?.user_name}
          </Typography>

          <Typography 
            variant="caption" 
            noWrap 
            sx={{ 
              display: 'block',
              color: 'text.secondary',
              fontSize: { xs: '0.75rem', sm: '0.8125rem' }
            }}
          >
            ID: {user?.UUI}
          </Typography>

          <Typography 
            variant="body2" 
            noWrap 
            sx={{ 
              color: 'text.secondary',
              fontSize: { xs: '0.75rem', sm: '0.8125rem' },
              mt: 0.5
            }}
          >
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 0.5 }}>
          {(user?.candidate ? candidateOption : user ? employeeOption(user) : [])?.map((option) => (
            <MenuItem 
              key={option.label} 
              onClick={() => handleClickItem(option.linkTo)}
              sx={{ 
                py: { xs: 1.25, sm: 1 },
                px: { xs: 2, sm: 1.5 },
                fontSize: { xs: '0.875rem', sm: '0.875rem' },
                minHeight: 'auto',
                borderRadius: 0.75,
                '&:hover': {
                  backgroundColor: 'action.hover',
                }
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem 
          onClick={handleLogout} 
          sx={{ 
            m: 0.5,
            py: { xs: 1.25, sm: 1 },
            px: { xs: 2, sm: 1.5 },
            fontSize: { xs: '0.875rem', sm: '0.875rem' },
            minHeight: 'auto',
            borderRadius: 0.75,
            color: 'error.main',
            '&:hover': {
              backgroundColor: 'error.lighter',
            }
          }}
        >
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
}