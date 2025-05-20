// @mui
import { Typography, StackProps, Stack, Button } from '@mui/material';
import { useRouter } from 'next/router';

import UpgradeStorageIllustration from './UpgradeStorageIllustration';
// assets

// ----------------------------------------------------------------------

export default function GeneralUpgrade({ title, sx, ...other }: any) {
  const { push } = useRouter();

  return (
    <Stack
      alignItems="center"
      sx={{ p: 5, borderRadius: 2, bgcolor: 'background.neutral', ...sx }}
      {...other}
    >
      {title && (
        <Typography variant="h4" mb={2}>
          {title}
        </Typography>
      )}
      <UpgradeStorageIllustration />

      <Button
        size="large"
        color="warning"
        variant="contained"
        sx={{ mt: 5, mb: 2 }}
        onClick={() => push('/upgrade')}
      >
        Upgrade Plan
      </Button>
    </Stack>
  );
}
