import { createContext, useEffect, useReducer, useCallback, useMemo } from 'react';
import { socket } from 'src/socket';

// utils
import axios from '../utils/axios';
import localStorageAvailable from '../utils/localStorageAvailable';
//
import { isValidToken, setSession } from './utils';
import { ActionMapType, AuthStateType, AuthUserType, JWTContextType } from './types';

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
  RELOAD = 'RELOAD',
}

type Payload = {
  [Types.INITIAL]: {
    isAuthenticated: boolean;
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
  [Types.RELOAD]: {
    user: AuthUserType;
  };
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  }
  if (action.type === Types.RELOAD) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext<
  (JWTContextType & { dispatch?: React.Dispatch<ActionsType> }) | null
>(null);

// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const storageAvailable = localStorageAvailable();

  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const response = await axios.post('/users/find-by-id');

        const { data } = response.data;

        socket.emit('req', {
          en: 'LOGIN',
          data: {
            user_id: data?.employee_id || data?.candidate_id,
            role_id: data?.role_id,
          },
        });

        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: true,
            user: data,
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [storageAvailable]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (payload: any) => {
    const response = await axios.post('/auth/login', payload);

    const { token } = response.data.data;
    console.log('token', response.data.data);

    if (
      response?.data?.data?.candidate?.is_verified === false &&
      response?.data?.data?.role_id === 3
    ) {
      window.location.href = `/verify/${btoa(response?.data?.data?.candidate?.email)}`;
      localStorage.setItem(
        'data',
        JSON.stringify({
          ...payload,
        })
      );
    } else if (
      response?.data?.data?.employee?.is_verified === false &&
      response?.data?.data?.role_id === 2
    ) {
      return response?.data?.data;
    } else {
      setSession(token);

      const user = await axios.post('/users/find-by-id');

      dispatch({
        type: Types.LOGIN,
        payload: {
          user: user.data.data,
        },
      });
    }
  }, []);

  // REGISTER
  const register = useCallback(
    async (formData: any) => {
      const email = formData?.get('email');
      const password = formData?.get('password');
      const role_id = formData?.get('role_id');

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const response = await axios.post('/auth/register', formData, config);

      if (response.data.success && response.status === 200) {
        await login({ email, password, role_id: Number(role_id) });
      }

      // const { accessToken, user } = response.data;

      // localStorage.setItem('accessToken', accessToken);

      // dispatch({
      //   type: Types.REGISTER,
      //   payload: {
      //     user,
      //   },
      // });
    },
    [login]
  );

  // LOGOUT
  const logout = useCallback(() => {
    setSession(null);
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      method: 'jwt',
      login,
      loginWithGoogle: () => {},
      loginWithGithub: () => {},
      loginWithTwitter: () => {},
      register,
      logout,
      dispatch,
      initialize,
    }),
    [state.isAuthenticated, state.isInitialized, state.user, login, logout, register, initialize]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
