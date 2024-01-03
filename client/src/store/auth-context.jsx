import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  username: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");

  const [token, setToken] = useState(!!initialToken ? initialToken : null);

  const initialName = localStorage.getItem("username");

  const [name, setName] = useState(!!initialName ? initialName : null);

  const userIsLoggedIn = !!token;
  const loginHandler = (token) => {
    setToken(token);
    setName(localStorage.getItem("username"));
    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  };

  const contextValue = {
    token: token,
    name: name,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
