import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography } from '@mui/material';

type uploadedFileType = any[];

const DragDropResume = ({ setValue, err }: any) => {
  const [uploadedFile, setUploadedFile] = useState<uploadedFileType>([]);

  const onDrop = (acceptedFiles: any) => {
    const file = acceptedFiles[0];
    setValue('filePath', file);
    setUploadedFile((prev: any) => [...prev, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    multiple: false,
    onDrop,
  } as any);

  return (
    <>
      <Box
        {...getRootProps()}
        sx={{
          margin: '1rem auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '12vh',
          width: '50vw',
          backgroundColor: '#086BFF1F',
          borderRadius: 1,
          border: 'transparent',
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            Drop your resume here...
          </Typography>
        ) : (
          <Box>
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              Drag & Drop your resume
            </Typography>
          </Box>
        )}
      </Box>

      {err && !uploadedFile.length ? (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {err.message}
        </Typography>
      ) : null}

      {uploadedFile?.map((file) => (
        <Typography variant="h5" sx={{ textAlign: 'center' }} key={file.name}>
          {file.name}
        </Typography>
      ))}
    </>
  );
};

export default DragDropResume;
