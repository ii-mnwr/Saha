import { ReactQuillProps } from 'react-quill';
// @mui
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/material';

// ----------------------------------------------------------------------

export interface EditorProps extends ReactQuillProps {
  id?: string;
  error?: boolean;
  simple?: boolean;
  helperText?: React.ReactNode;
  sx?: SxProps<Theme>;
  isTollbar?: boolean;
  style?: any;
  displayEditor?: boolean;
  isPicture?: boolean;
  isBgColor?: boolean;
}
