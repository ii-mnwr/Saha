import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// components
import LoadingScreen from '../components/loading-screen';
//
import { useAuthContext } from './useAuthContext';

// ----------------------------------------------------------------------

type GuestGuardProps = {
  children: React.ReactNode;
};

export default function GuestGuard({ children }: GuestGuardProps) {
  const { push } = useRouter();

  const { isAuthenticated, isInitialized, user } = useAuthContext();

  // console.log('userrrr', user);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     push('/dashboard');
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      if (user && user.role_id === 3) {
        push('/dashboard/candidate/');
      } else if (user && user.role_id === 2) {
        push('/dashboard/employer');
      } else if (user && user?.role_id === 1) {
        push('/super-admin/dashboard');
      }
    }
  }, [isAuthenticated, user]);

  if (isInitialized === isAuthenticated) {
    return <LoadingScreen />;
  }

  return <> {children} </>;
}
