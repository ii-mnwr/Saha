import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputBase,
  MenuItem,
  Pagination,
  Select,
  Typography,
} from '@mui/material';
import SkeletonHorizontalItem from '../skeleton/SkeletonHorizontalItem';
import { EmployeesList } from '../employee/EmployeesList';
import { EmployeeFilter } from '../employee/EmployeeFilter';
import axiosInstance from 'src/utils/axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import DataNotFound from '../DataNotFound';
import FormProvider from '../hook-form/FormProvider';
import { SearchIcon, StreamlineIcon } from 'src/theme/overrides/CustomIcons';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { countries } from 'src/assets/data';
import { useSettingsContext } from '../settings';
import Iconify from '../iconify';

const fetchCandidates = async (data: any) => {
  const response = await axiosInstance.post('candidates/list', data);
  return response?.data;
};

type FormValuesProps = {};

const UserComponent = () => {
  const { themeStretch } = useSettingsContext();
  const defaultValues = {};
  const schema = Yup.object().shape({});
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { watch } = methods;
  const [filters, setFilters] = useState<any>({
    search: '',
    nationality: '',
    type_of_employment: '',
    gender: '',
    notice_period: '',
    language: '',
    sort: 'id:desc',
    title: '',
    location: '',
    experience: '',
    education: '',
    age: '',
    licence: '',
    limit: 5,
    page: 1,
  });
  const { data, isLoading, error, refetch } = useQuery(['candidateData', filters], () =>
    fetchCandidates(filters)
  );
  const handleFilteration = (e: any) => {
    setFilters((filter: any) => ({
      ...filter,
      page: 1,
      [e.name]: e.value,
    }));
  };

  const resetFilter = () => {
    setFilters({
      search: '',
      nationality: '',
      type_of_employment: '',
      gender: '',
      notice_period: '',
      language: '',
      sort: 'id:desc',
      title: '',
      location: '',
      experience: '',
      education: '',
      age: '',
      licence: '',
      limit: 5,
      page: 1,
    });
  };

  return (
    <Container maxWidth={themeStretch ? false : 'xl'}>
      <Card sx={{ paddingX: 3, paddingBottom: 3 }}>
        <FormProvider methods={methods}>
          <Box
            sx={{
              background: '#C2D5FEF2',
              borderRadius: 2,
              padding: 2,
              display: 'flex',
              alignItems: 'center',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 1,
              marginTop: 4,
              width: '100%',
            }}
          >
            <Box
              component="form"
              sx={{
                padding: '12px 0 12px 15px',
                height: 'fit-content',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: '6px',
                width: '100%',
              }}
              style={{}}
            >
              <StreamlineIcon />
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search by Keyword"
                inputProps={{ 'aria-label': 'Search by Keyword' }}
                onChange={(e: any) =>
                  handleFilteration({
                    name: 'search',
                    value: e.target.value,
                  })
                }
              />
            </Box>

            <Box
              component="form"
              sx={{
                // padding: '12px 0 12px 15px',
                height: 'fit-content',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: '6px',
                width: '100%',
              }}
              style={{}}
            >
              <FormControl
                sx={{
                  width: {
                    xs: '100%',
                    md: '100%',
                  },
                }}
              >
                <Select
                  variant="outlined"
                  defaultValue=""
                  displayEmpty
                  onChange={(e: any) =>
                    handleFilteration({
                      name: 'location',
                      value: e.target.value,
                    })
                  }
                  value={filters?.location || ''}
                  renderValue={(selected) => {
                    console.log('🚀 ~ ProposalLetter ~ selected:', selected);
                    if (!countries) {
                      // Display loading state
                      return <em>Loading location...</em>;
                    }
                    if (!selected) {
                      // Default placeholder when no job is selected
                      return <em>Select location</em>;
                    }
                    const selectedJob = countries.find((item: any) => item.label == selected);
                    return selectedJob ? selectedJob.label : <em>Select job</em>;
                  }}
                  sx={{
                    background: '#fff',
                    boxShadow: 'none',
                    color: '#000000',
                    border: 'none',
                    ':hover': {
                      border: 'none',
                    },
                    '&.MuiOutlinedInput-root': {
                      fontWeight: 600,
                      fontFamily: 'Work Sans,sans-serif',
                      '.MuiOutlinedInput-notchedOutline': {
                        border: '1px solid rgba(145, 158, 171, 0.32)',
                        borderRadius: 0.75,
                        '& fieldset': {
                          border: 'transparent',
                        },
                      },
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    <span>Select location</span>
                  </MenuItem>
                  {countries?.map((item, index) => (
                    <MenuItem value={item?.label} key={item?.label}>
                      {item?.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* <Button
              variant="contained"
              startIcon={<SearchIcon />}
              sx={{
                background: '#086BFF',
                width: { xs: '100%', md: '46%' },
                ':hover': {
                  background: '#086BFF',
                },
                margin: '0',
                padding: '15px 0',
                height: 'fit-content',
              }}
            >
              Search
            </Button> */}

            <IconButton
              disabled={filters?.search === '' && filters?.location === ''}
              onClick={() => resetFilter()}
              color="error"
            >
              <Iconify icon="eva:trash-2-outline" />
            </IconButton>
          </Box>
        </FormProvider>

        <Typography
          fontSize={24}
          fontWeight={600}
          fontFamily="Work Sans,sans-serif"
          marginLeft={6}
          marginTop={6}
        >
          {data?.pagination?.count || 0} Candidates
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', xl: 'row' },
            justifyContent: 'space-between',
            padding: 2,
            width: '100%',
            gap: 2,
          }}
        >
          {(data === undefined || data?.data?.length === 0) && !isLoading && (
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                // alignItems: 'center',
                justifyContent: 'center',
                width: '70%',
              }}
            >
              <Grid item xs={11}>
                <DataNotFound />
              </Grid>
            </Box>
          )}
          {isLoading && (
            <Grid
              container
              spacing={2}
              sx={{
                background: '#8396D71F',
                borderRadius: 2,
                padding: 1,
                width: '100%',
                margin: 2,
              }}
            >
              {[...Array(5)]?.map((index: number) => (
                <Grid item xs={12}>
                  <SkeletonHorizontalItem key={index} />
                </Grid>
              ))}
            </Grid>
          )}
          {data?.data?.length > 0 && (
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                // alignItems: 'center',
                justifyContent: 'center',
                width: { xs: '100%', xl: '70%' },
              }}
            >
              <EmployeesList candidates={data?.data} />
              <Pagination
                count={Math.ceil(Number(data?.pagination?.count) / 5) || 0}
                page={filters?.page}
                onChange={(e, page) => {
                  setFilters((filter: any) => ({
                    ...filter,
                    page,
                  }));
                }}
                sx={{ position: 'absolute', bottom: 0, m: 2 }}
              />
            </Box>
          )}
          <Box sx={{ width: { xs: '100%', xl: '28%' } }}>
            <EmployeeFilter
              handleFilteration={handleFilteration}
              filter={filters}
              resetFilter={resetFilter}
              sx={{ width: '100%' }}
            />
          </Box>
        </Box>
      </Card>
    </Container>
  );
};

export default UserComponent;
