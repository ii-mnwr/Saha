import React, { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  IconButton,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import Iconify from '../iconify';
import { UploadProps } from './types';
import RejectionFiles from './errors/RejectionFiles';
import AvatarPreview from './preview/AvatarPreview';

// Styled Components
const StyledDropZone = styled('div')(({ theme }) => ({
  width: 180,
  height: 180,
  margin: 1,
  display: 'flex',
  cursor: 'pointer',
  borderRadius: '50%',
  alignItems: 'center',
  position: 'relative',
  justifyContent: 'center',
  border: `1px dashed ${alpha(theme.palette.grey[500], 0.32)}`,
}));

const StyledPlaceholder = styled('div')(({ theme }) => ({
  zIndex: 7,
  display: 'flex',
  borderRadius: '50%',
  position: 'absolute',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  width: `calc(100% - 16px)`,
  height: `calc(100% - 16px)`,
  color: theme.palette.text.disabled,
  backgroundColor: theme.palette.background.neutral,
  transition: theme.transitions.create('opacity', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
}));

export default function UploadAvatar({
  error,
  file,
  disabled,
  helperText,
  sx,
  onChange,
  onDelete,
  ...other
}: UploadProps | any) {
  const [openCropper, setOpenCropper] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const cropperRef = useRef<HTMLImageElement>(null);

  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: false,
    disabled,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const imageURL = URL.createObjectURL(file);
      setSelectedFile(imageURL);
      setOpenCropper(true);
    },
    ...other,
  });

  const dataURLToBlob = (dataURL: string) => {
    const [header, base64] = dataURL.split(',');
    const mime = header.match(/:(.*?);/)[1];
    const binary = atob(base64);
    const array = [];

    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }

    return new Blob([new Uint8Array(array)], { type: mime });
  };

  const handleCrop = () => {
    if (cropperRef.current) {
      const croppedCanvas = (cropperRef.current as any).cropper.getCroppedCanvas();
      const croppedImageURL = croppedCanvas.toDataURL();
      const croppedImageBlob = dataURLToBlob(croppedImageURL);
      setCroppedImage(croppedImageURL);
      setOpenCropper(false);
      onChange(croppedImageBlob); // Pass cropped image to parent component
    }
  };

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    setCroppedImage(null);
    onDelete && onDelete(); // Notify parent component of deletion
    onChange(null); // Clear value in React Hook Form
  };

  const hasFile = file ? !!file : !!croppedImage;

  return (
    <>
      <StyledDropZone
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...(isDragReject && { borderColor: 'error.light' }),
          ...(disabled && { opacity: 0.48, pointerEvents: 'none' }),
          ...(hasFile && { '&:hover': { '& .placeholder': { opacity: 1 } } }),
          ...sx,
        }}
      >
        <input {...getInputProps()} />

        {hasFile && <AvatarPreview file={croppedImage ? croppedImage : file} />}

        {!hasFile && (
          <StyledPlaceholder className="placeholder">
            <Iconify icon="ic:round-add-a-photo" width={24} sx={{ mb: 1 }} />
            <Typography variant="caption">{file ? 'Update photo' : 'Upload photo'}</Typography>
          </StyledPlaceholder>
        )}

        {hasFile && onDelete && (
          <IconButton
            size="small"
            onClick={handleDelete}
            sx={{
              top: 0,
              right: 10,
              zIndex: 9,
              position: 'absolute',
              color: (theme) => alpha(theme.palette.common.white, 0.8),
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              '&:hover': { bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48) },
            }}
          >
            <Iconify icon="eva:close-fill" width={16} />
          </IconButton>
        )}
      </StyledDropZone>

      {helperText && helperText}
      <RejectionFiles fileRejections={fileRejections} />

      <Dialog open={openCropper} onClose={() => setOpenCropper(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Crop Image</DialogTitle>
        <DialogContent>
          {selectedFile && (
            <Cropper
              src={selectedFile}
              style={{ height: 400, width: '100%' }}
              aspectRatio={1}
              guides={false}
              ref={cropperRef}
              viewMode={1}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCropper(false)}>Cancel</Button>
          <Button onClick={handleCrop} variant="contained" color="primary">
            Crop & Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
