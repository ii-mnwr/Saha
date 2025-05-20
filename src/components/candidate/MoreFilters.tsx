import React from 'react';
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { CloseIcon } from 'src/theme/overrides/CustomIcons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { jobSalary } from 'src/assets/data/jobData';
import { RHFSelect, RHFTextField } from '../hook-form';
import FormProvider from '../hook-form/FormProvider';

const appType: any = {
  '': '',
  company_site: 'Company Site',
  easy_to_apply: 'Easy to Apply',
};

type props = {
  setFilter: any;
  handleClosePopover: any;
  filter: any;
  isClear?: boolean;
  onClear?: any;
};

const MoreFilters = ({
  setFilter,
  handleClosePopover,
  filter,
  isClear = false,
  onClear,
}: props) => (
  <>
    <Box sx={{ p: 1 }} display="flex" justifyContent="space-between" alignItems="center">
      <Typography variant="h6" sx={{ pl: 2 }}>
        More Filters
      </Typography>
      <IconButton
        color="error"
        onClick={() => {
          handleClosePopover();
        }}
      >
        <CloseIcon />
      </IconButton>
    </Box>
    <Divider sx={{ borderStyle: 'solid' }} />

    <Grid
      container
      spacing={3}
      sx={{
        p: 2,
        height: 300,
        overflowY: 'auto',
      }}
    >
      <Grid item md={6}>
        <Box width="100%" display="flex" flexDirection="column" gap={1}>
          <Typography
            sx={{
              fontFamily: 'Work Sans,sans-serif',
              fontSize: 16,
              fontWeight: 600,
              color: '#000',
            }}
          >
            Education
          </Typography>
          <FormControl fullWidth sx={{ minWidth: 120, border: 'none' }} size="small">
            <Select
              value={filter?.education}
              onChange={(e: any) =>
                setFilter((data: any) => ({
                  ...data,
                  education: e.target.value,
                }))
              }
              displayEmpty
              renderValue={(selected) => {
                if (selected?.length === 0) {
                  return <span>Education</span>;
                }
                return selected;
              }}
            >
              <MenuItem value="" disabled>
                <em>Education</em>
              </MenuItem>
              <MenuItem value="High School" key="text">
                High School
              </MenuItem>
              <MenuItem value="Diploma" key="diploma">
                Diploma
              </MenuItem>
              <MenuItem value="Bachelors" key="bachelors">
                Bachelors
              </MenuItem>
              <MenuItem value="Masters" key="masters">
                Masters
              </MenuItem>
              <MenuItem value="PHD" key="phd">
                PHD
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box width="100%" mt={1} display="flex" flexDirection="column" gap={1}>
          <Typography
            sx={{
              fontFamily: 'Work Sans,sans-serif',
              fontSize: 16,
              fontWeight: 600,
              color: '#000',
            }}
          >
            Company name
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Company name"
            onChange={(e) => {
              setFilter((data: any) => ({
                ...data,
                company_name: e.target.value,
              }));
            }}
            value={filter?.company_name}
          />
        </Box>
        <Box width="100%" mt={1} display="flex" flexDirection="column" gap={1}>
          <Typography
            sx={{
              fontFamily: 'Work Sans,sans-serif',
              fontSize: 16,
              fontWeight: 600,
              color: '#000',
            }}
          >
            Job posted date
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Enter posted date"
            onChange={(e) => {
              setFilter((data: any) => ({
                ...data,
                postedAt: e.target.value,
              }));
            }}
            type="date"
            value={filter?.postedAt}
          />
        </Box>
      </Grid>
      <Grid item md={6}>
        <Box width="100%" display="flex" flexDirection="column" gap={1}>
          <Typography
            sx={{
              fontFamily: 'Work Sans,sans-serif',
              fontSize: 16,
              fontWeight: 600,
              color: '#000',
            }}
          >
            Job type
          </Typography>
          <FormControl fullWidth sx={{ minWidth: 120, border: 'none' }} size="small">
            <Select
              value={filter?.job_type}
              onChange={(e: any) =>
                setFilter((data: any) => ({
                  ...data,
                  job_type: e.target.value,
                }))
              }
              displayEmpty
              renderValue={(selected) => {
                if (selected?.length === 0) {
                  return <span>Job type</span>;
                }
                return selected;
              }}
            >
              <MenuItem value="" disabled>
                <em>Job type</em>
              </MenuItem>
              <MenuItem value="Remote Based" key="text">
                Remote Based
              </MenuItem>
              <MenuItem value="Onsite" key="diploma">
                Onsite
              </MenuItem>
              <MenuItem value="Full time" key="bachelors">
                Full time
              </MenuItem>
              <MenuItem value="Temporary" key="masters">
                Temporary
              </MenuItem>
              <MenuItem value="Permanent" key="phd">
                Permanent
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box width="100%" mt={1} display="flex" flexDirection="column" gap={1}>
          <Typography
            sx={{
              fontFamily: 'Work Sans,sans-serif',
              fontSize: 16,
              fontWeight: 600,
              color: '#000',
            }}
          >
            Remuneration
          </Typography>
          <FormControl fullWidth sx={{ minWidth: 120, border: 'none' }} size="small">
            <Select
              value={
                filter?.remuneration?.min
                  ? `${filter?.remuneration?.min} to ${filter?.remuneration?.max}`
                  : ''
              }
              onChange={(e: any) =>
                setFilter((data: any) => ({
                  ...data,
                  remuneration: {
                    min: e.target.value?.split?.('to')?.[0],
                    max: e.target.value?.split?.('to')?.[1],
                  },
                }))
              }
              displayEmpty
              renderValue={(selected) => {
                if (selected?.length === 0) {
                  return <span>Remuneration</span>;
                }
                return selected;
              }}
            >
              <MenuItem value="" disabled>
                <em>Remuneration</em>
              </MenuItem>
              {jobSalary.map((data) => (
                <MenuItem key={data.label} value={data.label}>
                  {data.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box width="100%" mt={1} display="flex" flexDirection="column" gap={1}>
          <Typography
            sx={{
              fontFamily: 'Work Sans,sans-serif',
              fontSize: 16,
              fontWeight: 600,
              color: '#000',
            }}
          >
            Application type
          </Typography>
          <FormControl fullWidth sx={{ minWidth: 120, border: 'none' }} size="small">
            <Select
              value={appType?.[filter?.application_type]}
              onChange={(e: any) =>
                setFilter((data: any) => ({
                  ...data,
                  application_type: e.target.value,
                }))
              }
              displayEmpty
              renderValue={(selected) => {
                if (selected?.length === 0) {
                  return <span>Application type</span>;
                }
                return selected;
              }}
            >
              <MenuItem value="" disabled>
                <em>Application type</em>
              </MenuItem>
              <MenuItem value="easy_to_apply" key="text">
                Easy to Apply
              </MenuItem>
              <MenuItem value="company_site" key="diploma">
                Company Site
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
    </Grid>
    {isClear && (
      <>
        <Divider sx={{ borderStyle: 'solid' }} />
        <Button
          variant="text"
          sx={{
            margin: 1,
            textTransform: 'none',
          }}
          onClick={() => {
            onClear();
          }}
        >
          Clear filter
        </Button>
      </>
    )}
  </>
);

export default MoreFilters;
