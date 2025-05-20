import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useRouter } from 'next/router';

const LoginAsModal = ({ open, setOpen, handleClose, setValue, isSignUp, setType }: any) => {
  const route = useRouter();
  const { user } = useAuthContext();

  const [roleId, setRoleId] = useState(-1);

  // const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        maxWidth="lg"
        sx={{ margin: '20px' }}
      >
        <Box
          sx={{
            // margin: 4, // 20px margin
            // bgcolor: 'background.paper',
            // boxShadow: 24,
            p: 4,
          }}
        >
          <IconButton
            aria-label="close"
            onClick={() => {
              if (isSignUp) {
                route.back();
                handleClose();
              } else {
                handleClose();
              }
            }}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'grey.500',
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography id="modal-title" variant="h3" textAlign="center" component="h2" padding={3}>
            Please select your login option
          </Typography>
          {/* <Typography id="modal-description" sx={{ mt: 2 }}>
            Sign up through your UAE pass
          </Typography> */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              mt: 2,
              flexDirection: { xs: 'column', xl: 'row' },
            }}
          >
            <Box
              sx={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                padding: 4,
                textAlign: 'center',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                border: roleId === 2 ? '1px solid blue' : '',
                width: { xs: '100%', xl: '30%' },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
              onClick={() => {
                if (isSignUp) {
                  setValue('role_id', 2);
                  setType(2);
                  handleClose();
                } else {
                  route.push({ pathname: '/login', query: { role: '2' } });
                  handleClose();
                }
              }}
            >
              <img
                alt="Employer"
                src="/assets/employer.svg"
                style={{ width: '100%', height: '100%' }}
              />
              <Typography variant="h4" sx={{ marginY: 2 }}>
                Employer
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: '#0a2239',
                  '&:hover': {
                    backgroundColor: '#0a2237',
                  },
                }}
                fullWidth
                onClick={() => {
                  if (isSignUp) {
                    setValue('role_id', 2);
                    setType(2);
                    handleClose();
                  } else {
                    route.push({ pathname: '/login', query: { role: '2' } });
                    handleClose();
                  }
                }}
                // onClick={() => {

                //   setValue('role_id', 2);
                //   handleClose();
                // }}
              >
                Continue
              </Button>
            </Box>
            <Box
              sx={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                padding: 4,
                textAlign: 'center',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                border: roleId === 3 ? '1px solid blue' : '',
                width: { xs: '100%', xl: '30%' },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                mt: { xs: 2, xl: 0 },
              }}
              onClick={() => {
                if (isSignUp) {
                  setValue('role_id', 3);
                  setType(3);
                  handleClose();
                } else {
                  route.push({ pathname: '/login', query: { role: '3' } });
                  handleClose();
                }
              }}
            >
              <img
                src="/assets/candidate.svg"
                alt="candidate"
                style={{ width: '100%', height: '100%' }}
              />
              <Typography variant="h4" sx={{ marginY: 2 }}>
                Candidate
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: '#0a2239',
                  '&:hover': {
                    backgroundColor: '#0a2237',
                  },
                }}
                // onClick={() => {
                //   setValue('role_id', 3);
                //   handleClose();
                // }}
                onClick={() => {
                  if (isSignUp) {
                    setValue('role_id', 3);
                    setType(3);
                    handleClose();
                  } else {
                    route.push({ pathname: '/login', query: { role: '3' } });
                    handleClose();
                  }
                }}
                fullWidth
              >
                Continue
              </Button>
            </Box>
            <Box
              sx={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                padding: 4,
                textAlign: 'center',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                // border: roleId === 3 ? '1px solid blue' : '',
                width: { xs: '100%', xl: '30%' },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                mt: { xs: 2, xl: 0 },
              }}
            >
              <img
                src="/assets/upskilling.svg"
                alt="candidate"
                style={{ width: '100%', height: '100%' }}
              />
              <Typography variant="h4" sx={{ marginY: 2 }}>
                Recruiter
              </Typography>
              <Typography variant="h4" sx={{fontWeight: 500}}>
                Coming soon...
              </Typography>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </div>
  );
};

export default LoginAsModal;
