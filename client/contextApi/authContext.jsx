import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (input) => {
    const response = await axios.post(
      "http://localhost:4000/api/auth/login",
      input
    );
    setCurrentUser(response.data);
  };

  const logout = async () => {
    await axios.post("http://localhost:4000/api/auth/logout");
    setCurrentUser(null);
  };

  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser])

  return(
    <AuthContext.Provider value={{currentUser, login, logout}} >
        {children}
    </AuthContext.Provider>
  )
};
