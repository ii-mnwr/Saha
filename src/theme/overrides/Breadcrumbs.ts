import { Theme } from '@mui/material/styles';
import { pxToRem } from '../typography';

// ----------------------------------------------------------------------

export default function Breadcrumbs(theme: Theme) {
  return {
    MuiBreadcrumbs: {
      styleOverrides: {
        separator: {
          marginLeft: theme.spacing(0),
          marginRight: theme.spacing(0),
        },
        li: {
          display: 'inline-flex',
          margin: theme.spacing(0.21, 0),
          '& > *': {
            fontSize: pxToRem(14),
            fontWeight: 300,
            fontFamily: 'Work Sans,sans-serif',
            color: '#000',
          },
        },
      },
    },
  };
}
