import { createContext, FC, PropsWithChildren, useState } from "react";

export interface ILoggedInContextType {
  isLoggedIn: boolean;
  userId: string;
  changeLoggedInState: (value: boolean, userId: string) => void;
}
export const LoggedInContext = createContext<ILoggedInContextType>({
  isLoggedIn: false,
  changeLoggedInState: (value: boolean, userId: string) => ({}),
  userId: "",
});

const LoggedInProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const changeLoggedInState = (value: boolean, userId: string) => {
    setLoggedIn(value);
    setUserId(userId);
  };

  return (
    <LoggedInContext.Provider
      value={{ isLoggedIn, changeLoggedInState, userId }}
    >
      {children}
    </LoggedInContext.Provider>
  );
};

export default LoggedInProvider;
