import React from 'react';
import { AuthContext, useAuthState, AuthContextType } from '../../hooks/useAuth';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const authState = useAuthState();

  const contextValue: AuthContextType = {
    user: authState.user,
    session: authState.session,
    loading: authState.loading,
    signUp: authState.signUp,
    signIn: authState.signIn,
    signOut: authState.signOut,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;