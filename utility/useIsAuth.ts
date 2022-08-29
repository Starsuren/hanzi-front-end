import {useLoggedQuery } from "../generated/graphql";
import { useRouter } from "next/router";
import { useEffect,Dispatch,SetStateAction} from "react";

export const useIsAuth = (setShowComponents:Dispatch<SetStateAction<boolean>>) => {
  const { data, loading } = useLoggedQuery();
  const router = useRouter();

  useEffect(() => {
    if (!loading && data?.isLogged) {
      router.push('/');
    } else if (data?.isLogged===null) setShowComponents(true);
  }, [data, router, loading]);
};

