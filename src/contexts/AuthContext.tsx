import { getProfile } from "@/api-client/modules/authApiClient";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContexType = {
  profile: {
    userId: string;
  };
};

const AuthContext = createContext<AuthContexType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [profile, setProfile] = useState<any | undefined>(undefined);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = await getProfile();

        console.log({ result });
        if (result.status === 200) {
          setProfile(result.data);
        }
      } catch (error) {
        console.error({ error });
      }
    };

    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ profile }}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
