import React, { createContext } from "react";

// interface UserContext {
//   user: string;
//   token: string;
// }

const AuthContext = createContext<any>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const storedUser = localStorage.getItem("user");

  const [user, setUser] = React.useState(storedUser);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
