import { createContext, FC, PropsWithChildren, useState } from "react";

export interface ILoggedInContextType {
  isLoggedIn: boolean;
  changeLoggedInState: (value: boolean) => void;
}
export const LoggedInContext = createContext<ILoggedInContextType>({
  isLoggedIn: false,
  changeLoggedInState: (value: boolean) => ({}),
});

const LoggedInProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const changeLoggedInState = (value: boolean) => {
    setLoggedIn(value);
  };

  return (
    <LoggedInContext.Provider value={{ isLoggedIn, changeLoggedInState }}>
      {children}
    </LoggedInContext.Provider>
  );
};

export default LoggedInProvider;
