import {useLoggedQuery } from "../generated/graphql";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useIsAuth = () => {
  const { data, loading } = useLoggedQuery();
  const router = useRouter();
  useEffect(() => {
    if (!loading && !data?.isLogged) {
      router.replace('/login?next=' + router.pathname);
    }
  }, [data, router, loading]);
};