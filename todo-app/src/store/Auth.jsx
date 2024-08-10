import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const storeToken = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  const LogoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  const baseURL = "https://todo-ten-pi-62.vercel.app";

  let isLoggedIn = !!token;

  return (
    <AuthContext.Provider
      value={{ token, storeToken, LogoutUser, baseURL, isLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const contextValue = useContext(AuthContext);

  if (!contextValue) {
    throw new Error("Context is not Available");
  }
  return contextValue;
};
