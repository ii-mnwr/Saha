import { useSnackbar } from 'src/components/snackbar';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import axiosInstance from 'src/utils/axios';
import usePostRequest from './usePost';

interface Filter {
  limit: number;
  page: number;
  sort: string;
}

const fetchFolders = async (filter: Filter) => {
  const response = await axiosInstance.post('/folders/list', filter);
  return response?.data;
};

const fetchFolderById = async (id: any) => {
  const response = await axiosInstance.post('/folders/find-by-id', id);
  return response?.data;
};

// Custom hook to use the fetchApplicants
export const useEmployeeServices = () => {
  const { enqueueSnackbar } = useSnackbar();

  const sendEmail = usePostRequest();

  const sendEmailApplication = (data: {
    email?: string;
    subject?: string;
    body?: string;
    contact_number?: any;
  }) => {
    const payload = {
      email: data.email ?? '',
      subject: data.subject,
      body: data.body,
      number: data.contact_number ?? '',
    };

    const url = '/employees/send-email';
    console.log('data', payload);
    sendEmail.mutate([url, payload], {
      onSuccess: (response: any) => {
        // Handle success
        enqueueSnackbar(response?.message || 'Sent successfully', {
          variant: 'success',
        });
      },
      onError: (error: any) => {
        // Handle error
        enqueueSnackbar(error.message, { variant: 'error' });
      },
    });
  };

  const sourcingAssistanceUsePost = usePostRequest();

  const callSourcingAssistanceApi = (data: {
    positionName: string;
    companyName: string;
    nationality: string;
    jobLocation: string;
    salary: string;
    responsibilities: string;
    otherDetails: string;
  }) => {
    const url = '/employees/sourcing-form';

    sourcingAssistanceUsePost.mutate([url, data], {
      onSuccess: (response: any) => {
        // Handle success
        enqueueSnackbar(response?.message || 'Sent successfully', {
          variant: 'success',
        });
      },
      onError: (error: any) => {
        // Handle error
        enqueueSnackbar(error.message, { variant: 'error' });
      },
    });
  };

  return { sendEmailApplication, sendEmail, callSourcingAssistanceApi, sourcingAssistanceUsePost };
};

export const useGetAllFolders = () => {
  const [filters, setFilters] = useState({
    limit: 10,
    page: 1,
    sort: 'id:desc',
  });
  const getAllApplicants = useQuery(['foldersLists', filters], () => fetchFolders(filters), {
    keepPreviousData: true, // optional, keeps previous data while new data is loading
  });

  return { getAllApplicants, filters, setFilters };
};

export const useGetFolderDetails = (id: any) => {
  const getFolderDetails = useQuery(
    ['folderDetails'],
    () =>
      fetchFolderById({
        id: Number(id),
      }),
    {
      keepPreviousData: true, // optional, keeps previous data while new data is loading
    }
  );

  return { getFolderDetails };
};


 const sendJobOffer = async (data: {
    application_id: number;
    job_id: number;
    email: string;
    template: string;
  }) => {
    const response = await axiosInstance.post('/employees/job-offer/send', data);
    return response.data;
  };

  export const useSendJobOffer = () => useMutation(sendJobOffer);