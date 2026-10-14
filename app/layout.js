"use client"; // Tambahkan ini di baris pertama
import StoreProvider from "./StoreProvider";
import { SessionProvider } from 'next-auth/react';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <head> 
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </head> */}
      <body>
      <StoreProvider>
        <SessionProvider>{children}</SessionProvider>
      </StoreProvider>
      </body>
    </html>
  );
}
