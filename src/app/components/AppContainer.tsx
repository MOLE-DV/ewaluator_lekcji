"use client";

import { PropsWithChildren } from "react";
import { useLoadingScreen } from "../contexts/LoadingScreenContext";
import Loading from "../loading";

export const AppContainer = ({ children }: PropsWithChildren) => {
  const { loading } = useLoadingScreen();
  return (
    <>
      {loading && <Loading />}
      {children}
    </>
  );
};
