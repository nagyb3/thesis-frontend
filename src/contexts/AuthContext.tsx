import { getProfile } from "@/api-client/modules/authApiClient";
import { UserType } from "@/types/UserType";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  profile: UserType | undefined;
  fetchProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<UserType | undefined>(undefined);

  const fetchProfile = async () => {
    try {
      const result = await getProfile();

      if (result.status === 200) {
        setProfile(result.data);
      }
    } catch (error) {
      console.error({ error });
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ profile, fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
};
