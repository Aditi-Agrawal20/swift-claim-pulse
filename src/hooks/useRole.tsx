import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Role = 'admin' | 'manager' | 'employee' | 'finance' | 'director';

interface RoleContextType {
  role: Role;
  setRole: (role: Role) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
  companyExists: boolean;
  setCompanyExists: (v: boolean) => void;
  mustChangePassword: boolean;
  setMustChangePassword: (v: boolean) => void;
}

const RoleContext = createContext<RoleContextType>({
  role: 'admin',
  setRole: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  companyExists: true,
  setCompanyExists: () => {},
  mustChangePassword: false,
  setMustChangePassword: () => {},
});

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role>('admin');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [companyExists, setCompanyExists] = useState(true);
  const [mustChangePassword, setMustChangePassword] = useState(false);
  return (
    <RoleContext.Provider value={{ role, setRole, isLoggedIn, setIsLoggedIn, companyExists, setCompanyExists, mustChangePassword, setMustChangePassword }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);

export const roleColors: Record<Role, string> = {
  admin: '#7c3aed',
  manager: '#3b82f6',
  employee: '#00e5a0',
  finance: '#f59e0b',
  director: '#f43f5e',
};

export const roleLabels: Record<Role, string> = {
  admin: 'Admin',
  manager: 'Manager',
  employee: 'Employee',
  finance: 'Finance',
  director: 'Director',
};
