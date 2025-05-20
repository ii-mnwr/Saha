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

const fetchGetAllFeedback = async (filter: Filter) => {
  const response = await axiosInstance.post('/feedbacks/list', filter);
  return response?.data;
};

const fetchIsFeedbackSentOrNot = async () => {
  const response = await axiosInstance.post('/feedbacks/by-user');
  return response?.data;
};

export const useGetAllFeedbacks = () => {
  const [page, setPage] = useState(1);

  const { data: getAllFeedback, isLoading } = useQuery(
    ['feedbacklist', page],
    () =>
      fetchGetAllFeedback({
        limit: 10,
        page,
        sort: 'id:desc',
      }),
    {
      keepPreviousData: true, // optional, keeps previous data while new data is loading
    }
  );

  const { data: isFeedbackSent, isLoading: isFeedbackSentLoading } = useQuery(
    ['isFeedbackSent', page],
    () => fetchIsFeedbackSentOrNot(),
    {
      keepPreviousData: true, // optional, keeps previous data while new data is loading
    }
  );

  return { getAllFeedback, setPage, page, isLoading, isFeedbackSent, isFeedbackSentLoading };
};
