import { createContext, PropsWithChildren, useContext } from "react";
import {
  useLoggedQuery,
  LoggedQuery,
  LoggedQueryResult,
} from "../generated/graphql";
import withApollo from "../utility/withApollo";
import { NextPage } from "next";
import { ApolloError } from "@apollo/client";

const AuthContext = createContext<LoggedQueryResult>({} as LoggedQueryResult);
const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const loggedResults = useLoggedQuery();

  return (
    <AuthContext.Provider value={loggedResults}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
