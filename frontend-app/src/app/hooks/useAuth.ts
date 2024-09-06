import useSWR from "swr";
import { getLogin } from "../lib/api";

const useAuth = () => {
  const {
    data: session,
    // isLoading,
  } = useSWR(["api/login", "get"], getLogin, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const user = session?.user;
  return {
    user,
  };
};
export default useAuth;
