// src/components/candidate/FilterSidebar.tsx
import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Paper, 
  Drawer, 
  IconButton, 
  Typography,
  Menu,
  MenuItem
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const FilterDropdown = ({ 
  label, 
  value, 
  options = [], 
  onChange 
}: { 
  label: string,
  value?: string,
  options?: Array<{value: string, label: string}>,
  onChange?: (value: string) => void
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (value: string) => {
    onChange?.(value);
    handleClose();
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography 
        sx={{ 
          mb: 1, 
          fontFamily: 'Work Sans, sans-serif',
          fontSize: 14,
          color: '#666666',
        }}
      >
        {label}
      </Typography>
      <Box
        onClick={handleClick}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          border: '1px solid #E0E0E0',
          borderRadius: 1,
          p: 1.5,
          bgcolor: 'white',
          cursor: 'pointer',
          '&:hover': {
            borderColor: '#BDBDBD',
          }
        }}
      >
        <Typography 
          sx={{ 
            color: value ? '#333333' : '#ABAFB1',
            fontFamily: 'Work Sans, sans-serif',
            fontSize: 14,
          }}
        >
          {value ? options.find(opt => opt.value === value)?.label || value : 'Select option'}
        </Typography>
        <KeyboardArrowDownIcon sx={{ color: '#666666' }} />
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          '& .MuiPaper-root': {
            mt: 1,
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
            minWidth: 200,
          }
        }}
      >
        {options.map((option) => (
          <MenuItem 
            key={option.value} 
            onClick={() => handleSelect(option.value)}
            sx={{
              fontFamily: 'Work Sans, sans-serif',
              fontSize: 14,
              color: value === option.value ? '#0A2239' : '#333333',
              bgcolor: value === option.value ? '#F5F5F5' : 'transparent',
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

const FilterSidebar = ({
  filter,
  setFilter,
  isMobile,
  open,
  onClose,
  onClear,
}: {
  filter: any;
  setFilter: (filter: any) => void;
  isMobile?: boolean;
  open?: boolean;
  onClose?: () => void;
  onClear: () => void;
}) => {
  const handleFilterChange = (field: string, value: any) => {
    setFilter({
      ...filter,
      [field]: value,
    });
  };

  const educationOptions = [
    { value: 'high_school', label: 'High School' },
    { value: 'bachelors', label: 'Bachelor\'s Degree' },
    { value: 'masters', label: 'Master\'s Degree' },
    { value: 'phd', label: 'Ph.D.' },
  ];

  const experienceOptions = [
    { value: 'entry', label: '0-2 years' },
    { value: 'mid', label: '3-5 years' },
    { value: 'senior', label: '6-10 years' },
    { value: 'expert', label: '10+ years' },
  ];

  const employmentOptions = [
    { value: 'full_time', label: 'Full-time' },
    { value: 'part_time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'freelance', label: 'Freelance' },
  ];

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ];

  const ageOptions = [
    { value: '18-24', label: '18-24' },
    { value: '25-34', label: '25-34' },
    { value: '35-44', label: '35-44' },
    { value: '45-54', label: '45-54' },
    { value: '55+', label: '55+' },
  ];

  const medicalLicenseOptions = [
    { value: 'md', label: 'MD' },
    { value: 'do', label: 'DO' },
    { value: 'np', label: 'NP' },
    { value: 'pa', label: 'PA' },
    { value: 'rn', label: 'RN' },
  ];

  const filterContent = (
    <>
      <FilterDropdown
        label="Experience"
        value={filter.experience}
        options={experienceOptions}
        onChange={(value) => handleFilterChange('experience', value)}
      />
      <FilterDropdown
        label="Type of employment"
        value={filter.job_type || filter.employmentType}
        options={employmentOptions}
        onChange={(value) => handleFilterChange('job_type', value)}
      />
      <FilterDropdown
        label="Education"
        value={filter.education}
        options={educationOptions}
        onChange={(value) => handleFilterChange('education', value)}
      />
      <FilterDropdown
        label="Gender"
        value={filter.gender}
        options={genderOptions}
        onChange={(value) => handleFilterChange('gender', value)}
      />
      <FilterDropdown
        label="Age"
        value={filter.age}
        options={ageOptions}
        onChange={(value) => handleFilterChange('age', value)}
      />
      <FilterDropdown
        label="Medical License"
        value={filter.medicalLicense}
        options={medicalLicenseOptions}
        onChange={(value) => handleFilterChange('medicalLicense', value)}
      />
    </>
  );

  if (isMobile) {
    return (
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: '80%',
            maxWidth: 400,
            p: 3,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontFamily: 'Work Sans, sans-serif', fontWeight: 600 }}>
            Filters
          </Typography>
          <IconButton onClick={onClose} sx={{ color: '#666666' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        
        {filterContent}
        
        <Button
          variant="contained"
          onClick={onClear}
          sx={{ 
            mt: 2,
            bgcolor: '#E6E6E6',
            color: 'black', 
            borderRadius: 5,
            fontFamily: 'Work Sans, sans-serif', 
            fontWeight: 500,
            textTransform: 'none',
            '&:hover': {
              bgcolor: '#D6D6D6',
            }
          }}
          fullWidth
        >
          Remove all filters
        </Button>
      </Drawer>
    );
  }

  return (
    <Box sx={{ width: 400 }}>
      <Paper
        sx={{
          p: 3,
          borderRadius: 1.5,
          boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <Button
            variant="contained"
            onClick={onClear}
            sx={{ 
              bgcolor: '#E6E6E6',
              color: 'black', 
              borderRadius: 5,
              fontFamily: 'Work Sans, sans-serif', 
              fontWeight: 500,
              textTransform: 'none',
              '&:hover': {
                bgcolor: '#D6D6D6',
              }
            }}
          >
            Remove all filters
          </Button>
        </Box>
        
        {filterContent}
      </Paper>
    </Box>
  );
};

export default FilterSidebar;