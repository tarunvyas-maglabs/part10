import { useNavigate } from "react-router";
import { useApolloClient, useMutation } from "@apollo/client/react"
import { AUTHENTICATE } from "../graphql/mutations"
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();
  
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({ variables: { username, password }})
    const token = data?.authenticate?.accessToken;

    if(token) {
      await authStorage.setAccessToken(token);
    }
    apolloClient.resetStore();
    navigate('/');
  };

  return [signIn, result];
};

export default useSignIn;