import { useEffect, useState } from "react";
import { useToken } from "./useToken";
export const useUser = () => {
  const [token] = useToken();

  const getsomeuser = (token) => {
    const tokenUser = token.split(".")[1];
    return JSON.parse(atob(tokenUser));
  };
  const [user, setUser] = useState(() => {
    if (!token) return null;
    return getsomeuser(token);
  });
  useEffect(() => {
    if (!token) {
      setUser(null);
    } else {
      setUser(getsomeuser(token));
    }
  }, [token]);
  return user;
};
