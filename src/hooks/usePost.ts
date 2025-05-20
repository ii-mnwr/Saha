import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import axiosInstance from 'src/utils/axios';

interface PostDataResponse {
  success: boolean;
  message: string;
  data?: any; // Replace `any` with a more specific type as needed
  config?: any
}

interface PostDataError {
  message: string;
}

// Define the function type for posting data
type PostFunction<T> = (url: string, data: T, config?:any) => Promise<PostDataResponse>;

// This function now explicitly matches the PostFunction type
const postData: PostFunction<any> = async (url, data, configHeader) => {

  const recievedConfig = configHeader ? configHeader : {}

  try {
    const response = await axiosInstance.post<PostDataResponse>(url, data, recievedConfig);
    return response.data;
  } catch (error) {
    // const axiosError = error as AxiosError<PostDataError>;
    console.log('axiosError', error);
    throw new Error(error.message || 'An error occurred');
  }
};

export default function usePostRequest<T>() {
  // The mutation function is now more explicitly structured for useMutation
  return useMutation<PostDataResponse, Error, [string, T, config?:any], unknown>(([url, data, config]) =>
    postData(url, data, config)
  );
}
