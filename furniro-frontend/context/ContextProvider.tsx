import axios from "axios";
import React, { useState, ReactNode, createContext, useEffect } from "react";

type ContextProviderProps = {
  children?: ReactNode;
};

type ContextValueType = {
  user?: string | null;
  token: string | null;
  permission: string [];
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
  setPermission: React.Dispatch<React.SetStateAction<string []>>;
};

const Context = createContext<ContextValueType | undefined>(undefined);

const ContextProvider = ({ children }: ContextProviderProps) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("Token");
  });
  const [user, setUser] = useState<string | null>(() => {
    return localStorage.getItem("User");
  });

  const [permission, setPermission] = useState<string  []>([]);

console.log(permission);

  const permissionFetch = async (token: string) => {
    try {
      const response = await axios.get("/api/user-permission", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
     
      if (response.status === 200) {
        setPermission(response.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    try {
      if (token) {
        localStorage.setItem("Token", token);
        setToken(token);
      } else {
        localStorage.removeItem("Token");
      }

      if (user) {
        localStorage.setItem("User", user);
        setUser(user);
      } else {
        localStorage.removeItem("User");
      }
    } catch (error) {
      // console.error("Error parsing JSON from localStorage:", error);
    }
  }, [token, user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("Token", token);
      permissionFetch(token);
    } else {
      localStorage.removeItem("Token");
      permissionFetch("");
    }
  }, []);

  return (
    <Context.Provider
      value={{ user, token, setToken, setUser, permission, setPermission }}
    >
      {children}
    </Context.Provider>
  );
};
export default ContextProvider;
export { Context };
