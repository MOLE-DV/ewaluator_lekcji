"use client";

import React, {
  PropsWithChildren,
  useContext,
  useState,
  createContext,
} from "react";

type LoadingScreenContextType = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoadingScreenContext = createContext<
  LoadingScreenContextType | undefined
>(undefined);

const LoadingScreenProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <LoadingScreenContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingScreenContext.Provider>
  );
};

const useLoadingScreen = () => {
  const ctx = useContext(LoadingScreenContext);
  if (!ctx) {
    throw new Error(
      "useLoadingScreen must be used within LoadingScreenProvider"
    );
  }
  return ctx;
};

export { LoadingScreenProvider, useLoadingScreen };
