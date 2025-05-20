import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from 'src/auth/useAuthContext';

// ----------------------------------------------------------------------

export default function Index() {
  const { user, logout } = useAuthContext();
  const router = useRouter();
  console.log('route', router);

  useEffect(() => {
    if (router.pathname === '/dashboard') {
      router.push(user && user.role_id === 3 ? 'dashboard/candidate/' : '/dashboard/employer');
    }
  });

  return null;
}
