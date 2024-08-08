import React, { useState, ReactNode, createContext, useEffect } from "react";

type ContextProviderProps = {
  children?: ReactNode;
};

interface Permission {
  permission: string[];
}

interface User {
  id: number;
  name: string;
  email: string;
  roles: {
    id: number;
    role_name: string;
    role_slug: string;
    permissions: {
      id: number;
      permission_name: string;
      permission_slug: string;
    }[];
  }[];
}

type ContextValueType = {
  user?: User | null;
  token: string | null;
  permissions: Permission;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setPermission: React.Dispatch<React.SetStateAction<Permission>>;
};

const Context = createContext<ContextValueType | undefined>(undefined);

const ContextProvider = ({ children }: ContextProviderProps) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("Token");
  });

  const [user, setUser] = useState<User | null>(() => {
    const userString = localStorage.getItem("User");
    return userString ? JSON.parse(userString) : null;
  });

  const [permissions, setPermission] = useState<Permission>({ permission: [] });

  useEffect(() => {
    try {
      if (token) {
        localStorage.setItem("Token", token);
      } else {
        localStorage.removeItem("Token");
      }

      if (user) {
        localStorage.setItem("User", JSON.stringify(user));
      } else {
        localStorage.removeItem("User");
      }
    } catch (error) {
      console.error("Error handling local storage:", error);
    }
  }, [token, user]);

  return (
    <Context.Provider
      value={{ user, token, setToken, setUser, permissions, setPermission }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
export { Context };
