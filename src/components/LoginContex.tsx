import React, { createContext, useContext, useState } from "react";

interface AuthContextProps {
  userId: string | null;
  isSubscribed: boolean;
  setUserId: (id: string) => void;
  setIsSubscribed: (status: boolean) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  return (
    <AuthContext.Provider value={{ userId, isSubscribed, setUserId, setIsSubscribed }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
