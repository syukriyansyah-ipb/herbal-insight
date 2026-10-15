"use client";

import StoreProvider from "./StoreProvider";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }) {
  return (
    <StoreProvider>
      <SessionProvider>{children}</SessionProvider>
    </StoreProvider>
  );
}