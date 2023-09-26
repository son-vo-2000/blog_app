import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const storedUser = localStorage.getItem("user");
  const initialUser = storedUser ? JSON.parse(storedUser) : null;
  const [currentUser, setCurrentUser] = useState(initialUser);

  const login = async (input) => {
    const response = await axios.post(
      `https://blogapp-production-7f9d.up.railway.app/api/auth/login`,
      input
    );
    setCurrentUser(response.data);
  };

  const logout = async () => {
    await axios.post(
      `https://blogapp-production-7f9d.up.railway.app/api/auth/logout`
    );
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
