import React, { createContext } from "react";

// interface UserContext {
//   user: string;
//   token: string;
// }

const AuthContext = createContext<any>(null);

interface AuthContextProps {
  children: React.ReactNode[];
}

const AuthProvider = ( {children }: AuthContextProps) => {
  const [user, setUser] = React.useState({});

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider};