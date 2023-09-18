import React, { createContext } from "react";

// interface UserContext {
//   user: string;
//   token: string;
// }

const AuthContext = createContext<any>(null);

const AuthProvider = (children: React.ReactNode) => {
  const [user, setUser] = React.useState();

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
