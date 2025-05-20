
// import { useMutation } from 'react-query';
// import axiosInstance from 'src/utils/axios';

// interface PostDataResponse {
//   success: boolean;
//   message: string;
//   data?: any; 
// }




// type PostFunction<T> = (url: string, formData: T) => Promise<PostDataResponse>;


// export const postFormData: PostFunction<any> = async (url, formData) => {

//     const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

   
//     const config = {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'Authorization': `Bearer ${accessToken}`
//         }
//       };

//   try {
//     const response = await axiosInstance.post<PostDataResponse>(url, formData, config);
//     return response.data;
//   } catch (error) {
   
//     console.log('axiosError', error);
//     // throw new Error(error.message || 'An error occurred');
//   }
// };

// export default function usePostFormData<T>() {
 
//   return useMutation<PostDataResponse, Error, [string, T], unknown>(([url, data]) =>
//     postFormData(url, data)
//   );
// }
