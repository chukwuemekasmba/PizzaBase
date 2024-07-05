import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';

type AuthData = {
  session: Session | null;
};

const AuthContext = createContext<AuthData>({
  session: null
});

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      await supabase.auth.getSession();
    }

    fetchSession();
  }, []);

  return (
    <AuthContext.Provider value={{ session }}>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);