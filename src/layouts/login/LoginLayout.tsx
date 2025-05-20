// @mui
import { Typography, Stack } from '@mui/material';
// components
import Logo from '../../components/logo';
import Image from '../../components/image';
//
import { StyledRoot, StyledSectionBg, StyledSection, StyledContent } from './styles';
import Header from '../dashboard/header';

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  illustration?: string;
  children: React.ReactNode;
  bgColor?: string;
};

export default function LoginLayout({ children, illustration, title, bgColor }: Props) {
  return (
    <StyledRoot
      sx={{
        bgcolor: bgColor ? bgColor : '#fff',
        // backgroundImage: `url(${'/assets/rag-dolls-one-blue_1.png'})`,
        // backgroundRepeat: 'no-repeat',
        // backgroundSize: 'cover',
        // backgroundPosition: 'center',
      }}
    >
      <StyledContent sx={{ alignItems: 'center' }}>
        <Stack sx={{ width: 1 }}> {children} </Stack>
      </StyledContent>
    </StyledRoot>
  );
}
