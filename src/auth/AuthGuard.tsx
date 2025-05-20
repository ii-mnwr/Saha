import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import LoadingScreen from '../components/loading-screen';
import { useAuthContext } from './useAuthContext';
import LoginPage from '../pages/login';

// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: React.ReactNode;
};

const publicPaths = ['/', '/about-us', '/contact-us', '/sign-up', '/category/[slug]']; // Define public paths here

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isInitialized } = useAuthContext();
  const router = useRouter();
  const { pathname } = router || {};

  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  useEffect(() => {
    if (isInitialized && !isAuthenticated && !publicPaths.includes(pathname)) {
      if (pathname !== '/login') {
        setRequestedLocation(pathname);
        router.push('/');
      }
    } else if (isAuthenticated) {
      if (requestedLocation && pathname !== requestedLocation) {
        router.push(requestedLocation);
      }
      setRequestedLocation(null);
    }
  }, [isAuthenticated, isInitialized, pathname, requestedLocation, router]);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated && !publicPaths.includes(pathname) && pathname !== '/login') {
    return null; // Prevents rendering the protected content during redirect
  }

  if (!isAuthenticated && pathname === '/login') {
    return <LoginPage />;
  }

  return <>{children}</>;
}
