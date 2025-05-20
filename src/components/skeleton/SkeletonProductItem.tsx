// @mui
import { Card, Skeleton, Stack, CardProps, styled, keyframes } from '@mui/material';

// ----------------------------------------------------------------------

const diagonalAnimation = keyframes`
  0% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
`;

const BlueSkeleton = styled(Skeleton)(({ theme }) => ({
  backgroundColor: 'rgba(0, 123, 255, 0.1)', // Light blue background
  '&::after': {
    background: 'linear-gradient(90deg, rgba(0, 123, 255, 0.1) 25%, rgba(0, 123, 255, 0.2) 50%, rgba(0, 123, 255, 0.1) 75%)', // Gradient matching the theme colors
  },
  // animation: `${diagonalAnimation} 1.5s linear infinite`,
}));

export default function SkeletonProductItem({ ...other }: CardProps) {
  return (
    <Card {...other}>
      <BlueSkeleton variant="rectangular" sx={{ paddingTop: '100%' }} />
      <Stack spacing={2} sx={{ p: 3 }}>
        <BlueSkeleton variant="text" sx={{ width: 0.5 }} />
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row">
            <BlueSkeleton variant="circular" sx={{ width: 16, height: 16 }} />
            <BlueSkeleton variant="circular" sx={{ width: 16, height: 16 }} />
            <BlueSkeleton variant="circular" sx={{ width: 16, height: 16 }} />
          </Stack>
          <BlueSkeleton variant="text" sx={{ width: 40 }} />
        </Stack>
      </Stack>
    </Card>
  );
}
