import { createContext, FC, PropsWithChildren, useState } from "react";

export interface ILoggedInContextType {
  isLoggedIn: boolean;
  userId: string;
  userAvatarColor: string;
  changeLoggedInState: (value: boolean, userId: string, color: string) => void;
}
export const LoggedInContext = createContext<ILoggedInContextType>({
  isLoggedIn: false,
  changeLoggedInState: (value: boolean, userId: string, color: string) => ({}),
  userId: "",
  userAvatarColor: "",
});

const LoggedInProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [userAvatarColor, setUserAvatarColor] = useState("");
  const changeLoggedInState = (
    value: boolean,
    userId: string,
    color: string
  ) => {
    setLoggedIn(value);
    setUserId(userId);
    setUserAvatarColor(color);
  };

  return (
    <LoggedInContext.Provider
      value={{ isLoggedIn, changeLoggedInState, userId, userAvatarColor }}
    >
      {children}
    </LoggedInContext.Provider>
  );
};

export default LoggedInProvider;
