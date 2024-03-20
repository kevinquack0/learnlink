'use client';
// AccountContext.js
import React, { createContext, useContext, useState } from 'react';
interface AccountContextType {
  accountId: string | null;
  updateAccountId: (id: string) => void;
}
const defaultContextValue: AccountContextType = {
  accountId: null,
  updateAccountId: () => { }, // Empty function as a placeholder
};

const AccountContext = createContext<AccountContextType>(defaultContextValue);

export const useAccount = () => useContext(AccountContext);

export const AccountProvider = ({ children }: any) => {
  const [accountId, setAccountId]: any = useState(null);

  const updateAccountId = (id: string) => {
    setAccountId(id);
  };

  return (
    <AccountContext.Provider value={{ accountId, updateAccountId }}>
      {children}
    </AccountContext.Provider>
  );
};
