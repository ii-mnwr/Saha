// @mui
import {
  List,
  Stack,
  Dialog,
  Button,
  TextField,
  DialogProps,
  DialogTitle,
  DialogActions,
  DialogContent,
  Select,
  MenuItem,
  Typography,
  Box,
} from '@mui/material';
import { useState } from 'react';
import { useGetAllFolders } from 'src/hooks/useEmployeeServices';
import { useApplicants } from 'src/hooks/useApplicants';
import { useRouter } from 'next/router';
// @types

// ----------------------------------------------------------------------

interface Props extends DialogProps {
  candidateId: string | number;
  open: boolean;
  onClose: VoidFunction;
}

export default function MoveFolderModel({ candidateId, open, onClose, ...other }: Props) {
  const { push } = useRouter();
  const [folderId, setFolderId] = useState('');
  const { getAllApplicants } = useGetAllFolders();
  const { moveFolderApiCall } = useApplicants();
  console.log('getAllApplicants', getAllApplicants?.data?.data?.length === 0);
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={onClose}
      PaperProps={{ style: { backgroundColor: 'white' } }}
      BackdropProps={{
        style: { backgroundColor: 'rgba(0, 0, 0, 0.2)' },
      }}
      {...other}
    >
      <DialogTitle> Move to folder </DialogTitle>

      <DialogContent sx={{ overflow: 'unset' }}>
        {getAllApplicants?.data?.data?.length === 0 ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={1}
            justifyContent="center"
          >
            <Typography variant="h4">Oops not data found</Typography>
            <Button
              variant="contained"
              onClick={() => {
                push('/employer-services/create-folders/');
              }}
            >
              Create
            </Button>
          </Box>
        ) : (
          <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
            <Select
              fullWidth
              labelId="time-slot-label"
              id="time-slot"
              name="timeSlot"
              value={
                getAllApplicants?.data?.data?.find((item: any) => item?.id === folderId)?.name || ''
              }
              displayEmpty
              renderValue={(selected: any) => {
                if (selected.length === 0) {
                  return <span>Select folder</span>;
                }
                return selected;
              }}
              onChange={(event) => {
                setFolderId(event.target.value);
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {getAllApplicants?.data?.data?.map((item: any) => (
                <MenuItem value={item?.id}>{item?.name}</MenuItem>
              ))}
            </Select>
            <Button
              disabled={folderId === ''}
              variant="contained"
              sx={{ flexShrink: 0 }}
              onClick={() => {
                moveFolderApiCall({ candidate_id: candidateId, folder_id: folderId });
              }}
            >
              Move
            </Button>
          </Stack>
        )}
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'end' }}>
        {onClose && (
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => {
              onClose();
              setFolderId('');
            }}
          >
            Close
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
