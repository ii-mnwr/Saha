import { useSnackbar } from 'src/components/snackbar';
import { useState } from 'react';
import { useQuery } from 'react-query';
import axiosInstance from 'src/utils/axios';
import { useRouter } from 'next/router';
import usePostRequest from './usePost';

interface Filter {
  status: string;
  limit: number;
  page: number;
  search: string;
  sort: string;
}

// Function to fetch applicants
export const fetchApplicants = async (filter: Filter) => {
  const response = await axiosInstance.post('/applications/list', filter);
  return response?.data;
};

const updateApplications = async (filter: Filter) => {
  const response = await axiosInstance.post('/applications/list', filter);
  return response?.data;
};

// Custom hook to use the fetchApplicants
export const useApplicants = (
  initialFilter: any = {
    status: '',
    limit: 10,
    page: 1,
    search: '',
    sort: 'id:desc',
  }
) => {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const [filter, setFilter] = useState<any>(initialFilter);

  const getAllApplicants = useQuery(['applicantsList', filter], () => fetchApplicants(filter), {
    keepPreviousData: true, // optional, keeps previous data while new data is loading
  });

  const updateApplicationsMutate = usePostRequest();

  const updateApplicationsApiCall = (
    data: { id: string | number; status: any },
    isPushedOfferletter: any = false,
    userEmail?: any
  ) => {
    const url = '/applications/update';

    updateApplicationsMutate.mutate([url, data], {
      onSuccess: (response: any) => {
        // Handle success
        enqueueSnackbar(response?.message || 'Saved successfully', {
          variant: 'success',
        });
        if (isPushedOfferletter)
          router.push(`/employer-services/proposal-letters?email=${userEmail}`);
      },
      onError: (error: any) => {
        // Handle error
        enqueueSnackbar(error.message, { variant: 'error' });
      },
    });
  };

  const moveFolderApiCall = (data: {
    candidate_id: string | number;
    folder_id: string | number;
  }) => {
    const url = '/employees/saved-applicant';

    updateApplicationsMutate.mutate([url, data], {
      onSuccess: (response: any) => {
        // Handle success
        enqueueSnackbar(response?.message || 'Folder moved successfully', {
          variant: 'success',
        });
      },
      onError: (error: any) => {
        // Handle error
        enqueueSnackbar(error.message, { variant: 'error' });
      },
    });
  };

  const createSechduleInterviewApiCall = (data: any) => {
    const url = '/employees/schedule/create';

    updateApplicationsMutate.mutate([url, data], {
      onSuccess: (response: any) => {
        // Handle success
        enqueueSnackbar(response?.message || 'Saved successfully', {
          variant: 'success',
        });
      },
      onError: (error: any) => {
        // Handle error
        enqueueSnackbar(error.message, { variant: 'error' });
      },
    });
  };

  return {
    getAllApplicants,
    updateApplicationsApiCall,
    setFilter,
    moveFolderApiCall,
    createSechduleInterviewApiCall,
    updateApplicationsMutate,
    filter,
  };
};
