import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { useSettingsContext } from 'src/components/settings';
import {  Box, Card, Container, Grid, Typography, TextField, Pagination, IconButton, Button, Paper, Drawer, } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useQuery } from 'react-query';
import axiosInstance from 'src/utils/axios';
import DataNotFound from 'src/components/DataNotFound';
import { SkeletonProductItem } from 'src/components/skeleton';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { CloseIcon } from 'yet-another-react-lightbox';
import JobCard from 'src/components/job-card/JobCard';
import FilterSidebar from 'src/components/candidate/FilterSidebar';

interface JobFilter {
  company_name?: string;
  location?: string;
  page?: number;
  limit?: number;
  education?: string;
  postedAt?: string;
  job_type?: string;
  application_mode?: string;
  remuneration?: string;
  application_type?: string;
  keywords?: string;
  sort?: string;
  experience?: string;
}

interface JobItem {
  id: number;
  company_name: string;
  job_title: string;
  skills: string;
  salary_from: string;
  salary_to: string;
  location: string;
  created_at: string;
  job_type: string;
  experience: string;
}

const fetchJobs = async (filter: JobFilter) => {
  const tempFilter = {
    ...filter,
  };
  const response = await axiosInstance.post('/jobs/list', tempFilter);
  return response?.data;
};

// Simple filter icon component
const FilterIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4h16v2.5l-6 6v7l-4-2v-5l-6-6V4z" fill="currentColor" />
  </svg>
)

SearchJob.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: 'Home',
        href: '#',
      },
      { name: 'Jobs', href: '#' },
      { name: 'Search Jobs', href: '#' },
    ]}
    title="Search Jobs"
  >
    {page}
  </DashboardLayout>
);

export default function SearchJob() {
  const router = useRouter();
  const [filter, setFilter] = useState<JobFilter>({
    company_name: '',
    location: '',
    page: 1,
    limit: 9,
    education: '',
    postedAt: '',
    job_type: '',
    application_mode: '',
    remuneration: '',
    application_type: '',
    keywords: '',
    experience: '',
  });
  const [refresh, setRefresh] = useState(false);
  const { themeStretch } = useSettingsContext();
  const [savingJobId, setSavingJobId] = useState<number | null>(null);

  const handleSaveJob = async (job: JobItem) => {
  setSavingJobId(job.id);
  try {
    const isCurrentlySaved = job.savedJob?.length > 0;
    
    if (isCurrentlySaved) {
      await axiosInstance.delete(`/jobs/unsave/${job.id}`);
    } else {
      await axiosInstance.post('/jobs/save', { job_id: job.id });
    }
    
    setRefresh(prev => !prev);
  } catch (error) {
    console.error('Error saving job:', error);
    // Consider adding toast notification here
  } finally {
    setSavingJobId(null);
  }
};
  const { data: jobData, isLoading } = useQuery(['jobsData', filter, refresh], () =>
    fetchJobs({
      ...filter,
      sort: 'id:desc',
    })
  );

  const handleClear = () => {
    if (localStorage.getItem('filter')) {
      localStorage.removeItem('filter');
    }
    setFilter({
      company_name: '',
      location: '',
      page: 1,
      limit: 9,
      application_mode: '',
      application_type: '',
      education: '',
      job_type: '',
      postedAt: '',
      remuneration: '',
      keywords: '',
      experience: '',
    });
  };

  const handleSearch = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    const data = localStorage.getItem('filter');
    if (data !== null) {
      const obj = JSON.parse(data);
      setFilter({
        ...obj,
        keywords: obj?.searchByKey || obj?.job_title,
      });
    }
  }, []);

  const handleFilterChange = (field: string, value: string) => {
    setFilter(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Search Jobs</title>
      </Head>
      <Container maxWidth={false} disableGutters={themeStretch}>
      <Box sx={{ p: { xs: 2, sm: 3 }, mt: { xs: -8, sm: 0 }, bgcolor: "#F0F0F0", borderRadius: 2, }}>
          <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
            {/* Main content - Search and job listings */}
            <Box sx={{ flex: 1 }}>
              {/* Search fields */}
              <Box sx={{ 
                display: 'flex', 
                gap: 2, 
                mb: 3,
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'stretch', sm: 'center' }
              }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Keywords"
                  value={filter.keywords}
                  onChange={(e) => handleFilterChange('keywords', e.target.value)}
                  InputProps={{
                    sx: {
                      fontFamily: 'Work Sans, sans-serif',
                      bgcolor: 'white',
                    },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#E0E0E0',
                      },
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: '#ABAFB1',
                      fontFamily: 'Work Sans, sans-serif',
                    },
                  }}
                />
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Years of experience"
                  value={filter.experience}
                  onChange={(e) => handleFilterChange('experience', e.target.value)}
                  InputProps={{
                    sx: {
                      fontFamily: 'Work Sans, sans-serif',
                      bgcolor: 'white',
                    },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#E0E0E0',
                      },
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: '#ABAFB1',
                      fontFamily: 'Work Sans, sans-serif',
                    },
                  }}
                />
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Location"
                  value={filter.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  InputProps={{
                    sx: {
                      fontFamily: 'Work Sans, sans-serif',
                      bgcolor: 'white',
                    },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#E0E0E0',
                      },
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: '#ABAFB1',
                      fontFamily: 'Work Sans, sans-serif',
                    },
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleSearch}
                  sx={{
                    bgcolor: '#0A2239',
                    color: 'white',
                    px: 2,
                    fontFamily: 'Work Sans, sans-serif',
                    '&:hover': {
                      bgcolor: '#0A2239',
                    },
                    flexShrink: 0,
                  }}
                >
                  Search
                </Button>
              </Box>
              {/* Job Cards */}
                <Grid container spacing={3}>
                {jobData?.data?.length === 0 && !isLoading ? (
                  <Grid item xs={12} mt={2}>
                  <DataNotFound title="Search for jobs" path="/assets/searchjob.jpeg" />
                  </Grid>
                ) : isLoading ? (
                  [...Array(9)].map((_, index) => (
                  <Grid item xs={12} sm={6} md={4} key={`skeleton-${index}`}>
                    <SkeletonProductItem />
                  </Grid>
                  ))
                ) : jobData?.data ? (
                  jobData.data.map((item: JobItem) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={item.id}
                    onClick={() => {
                    router.push(`/candidate/jobs/search-jobs/job-details/${item?.id}`);
                    }}
                  >
                    <JobCard 
                    item={{
                      ...item,
                      // Ensure the item structure matches what JobCard expects
                      title: item?.job_title,
                      company: { name: item?.company?.name },
                      title: item?.title,
                      salary_max: item?.salary_max,
                      salary_min: item?.salary_from,
                      created_at: item?.created_at
                    }} 
                    setRefresh={() => setRefresh((prev) => !prev)}  // Pass the refresh function
                    onSaveJob={handleSaveJob} // Pass the save job function
                    isSaving={savingJobId === item.id} // Pass the saving state
                    />
                  </Grid>
                  ))
                ) : null}
                </Grid>
              {/* Pagination */}
              {jobData?.pagination && jobData.pagination.count > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Pagination
                    shape="circular"
                    count={Math.ceil((jobData?.pagination?.count || 0) / 9)}
                    page={filter.page || 1}
                    onChange={(_, page) => {
                      setFilter(prev => ({
                        ...prev,
                        page,
                      }));
                    }}
                  />
                </Box>
              )}
            </Box>
            {/* Filter sidebar */}
            <Box sx={{ display: { xs: 'none', md: 'block' } }}> {/* Hide on mobile */}
              <FilterSidebar
                filter={filter}
                setFilter={setFilter}
                onClear={handleClear}
                isMobile={false}
              />
            </Box>

            {/* Mobile filter button and drawer */}
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <Button
              variant="contained"
              onClick={() => setDrawerOpen(true)}
              sx={{
              position: 'fixed',
              bottom: 16,
              right: 16,
              bgcolor: '#0A2239',
              color: 'white',
              borderRadius: '50%',
              width: 56,
              height: 56,
              minWidth: 'auto',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
              zIndex: 1300,
              }}
            >
              <FilterIcon />
            </Button>
            <FilterSidebar
              filter={filter}
              setFilter={setFilter}
              isMobile={true}
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              onClear={handleClear}
            />
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}