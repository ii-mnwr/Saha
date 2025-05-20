import { useSnackbar } from 'src/components/snackbar';
import { useState } from 'react';
import { useQuery } from 'react-query';
import axiosInstance from 'src/utils/axios';
import usePostRequest from './usePost';

interface Filter {
  limit: number;
  page: number;
  category?: string;
  search?: {
    title: string;
    location: string;
  };
  sort: string;
}

interface AppliedFilter {
  limit: number;
  page: number;
  search?: string;
  postedDate?: string;
  sort: string;
}

interface SubscribedFilter {
  limit: number;
  page: number;
  sort: string;
}

// Function to fetch applicants
const fetchResumeAlerts = async (filter: Filter) => {
  const response = await axiosInstance.post('/jobs/my-alerts', filter);
  return response?.data;
};

// Function to fetch applicants
const jobAlerts = async (filter: Filter) => {
  const response = await axiosInstance.post('/jobs/candidate-alerts', filter);
  return response?.data;
};

const appliedJob = async (filter: AppliedFilter) => {
  const data = {
    ...filter,
    keywords: filter?.search,
  };
  delete data?.search;
  const response = await axiosInstance.post('/candidates/applied-jobs', data);
  return response?.data;
};

const subscribedJob = async (filter: SubscribedFilter) => {
  const response = await axiosInstance.post('/jobs/subscribed-jobs', filter);
  return response?.data;
};

// Custom hook to use the fetchResumeAlerts
export const useJobs = (initialFilter: Filter) => {
  const [resumeAlertsLoading, setResumetAlertsLoading] = useState(true);
  const [candidateAlertsLoading, setCandidatetAlertsLoading] = useState(true);
  const [subscribedLoading, setSubscribedLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const [filter, setFilter] = useState<Filter>(initialFilter);

  const [filter2, setFilter2] = useState<Filter>(initialFilter);

  const getAllResumeAlerts = useQuery(['resumeAlerts', filter], () => fetchResumeAlerts(filter), {
    keepPreviousData: true, // optional, keeps previous data while new data is loading
    onSuccess: () => setResumetAlertsLoading(false),
    onError: () => setResumetAlertsLoading(false),
  });

  const getCandidateAlerts = useQuery(['candidateAlerts', filter2], () => jobAlerts(filter2), {
    keepPreviousData: true, // optional, keeps previous data while new data is loading
    onSuccess: () => setCandidatetAlertsLoading(false),
    onError: () => setCandidatetAlertsLoading(false),
  });

  const getSubscribedJobs = useQuery(
    ['subscribedJobs', filter2, refresh],
    () => subscribedJob(filter2),
    {
      keepPreviousData: true, // optional, keeps previous data while new data is loading
      onSuccess: () => setSubscribedLoading(false),
      onError: () => setSubscribedLoading(false),
    }
  );

  return {
    getAllResumeAlerts,
    setFilter,
    setFilter2,
    getCandidateAlerts,
    resumeAlertsLoading,
    candidateAlertsLoading,
    getSubscribedJobs,
    subscribedLoading,
    setRefresh,
  };
};

// Custom hook to use the fetchResumeAlerts
export const useAppliedJob = (
  initialFilter: AppliedFilter = {
    limit: 10,
    page: 1,
    sort: 'id:desc',
  }
) => {
  const [isLoading, setIsLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const [filter, setFilter] = useState<AppliedFilter>(initialFilter);
  const [refesh, setRefresh] = useState(false);

  const { data: getAllAppliedJobs, error } = useQuery(
    ['appliedJobs', filter, refesh],
    () => appliedJob(filter),
    {
      keepPreviousData: true, // optional, keeps previous data while new data is loading
      onSuccess: () => setIsLoading(false),
      onError: () => setIsLoading(false),
    }
  );

  return { getAllAppliedJobs, isLoading, setFilter, filter, setRefresh };
};
