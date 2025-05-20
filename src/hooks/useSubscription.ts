import { useSnackbar } from 'src/components/snackbar';
import { useState } from 'react';
import { useQuery } from 'react-query';
import axiosInstance from 'src/utils/axios';
import usePostRequest from './usePost';

interface Filter {
  limit: number;
  page: number;
  sort: string;
}

const fetchAllPlans = async (filter: Filter) => {
  const response = await axiosInstance.post('/plans/list', filter);
  return response?.data;
};

const fetchCurrentPlan = async () => {
  const response = await axiosInstance.post('/subscriptions/get-subscription');
  return response?.data;
};

export const createCheckoutSession = async (payload: { price_id: string; email: string }) => {
  const response = await axiosInstance.post('/subscriptions/create-checkout-session', payload);
  return response?.data;
};

export const upgradePlan = async (payload: { price_id: string }) => {
  const response = await axiosInstance.post('/subscriptions/upgrade', payload);
  return response?.data;
};

export const useGetAllPlans = () => {
  const [page, setPage] = useState(1);

  const getAllPlans = useQuery(
    ['allPlans', page],
    () =>
      fetchAllPlans({
        limit: 10,
        page,
        sort: 'id:asc',
      }),
    {
      keepPreviousData: true, // optional, keeps previous data while new data is loading
    }
  );

  return { getAllPlans, setPage, page };
};

export const useGetCurrentPlan = () => {
  const getCurrentPlan = useQuery(['currentPlan'], () => fetchCurrentPlan(), {
    keepPreviousData: true, // optional, keeps previous data while new data is loading
  });

  return { getCurrentPlan };
};
