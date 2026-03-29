import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Role = 'admin' | 'manager' | 'employee';

interface RoleContextType {
  role: Role;
  setRole: (role: Role) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
}

const RoleContext = createContext<RoleContextType>({
  role: 'admin',
  setRole: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role>('admin');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <RoleContext.Provider value={{ role, setRole, isLoggedIn, setIsLoggedIn }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
