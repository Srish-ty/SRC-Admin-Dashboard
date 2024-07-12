"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo-client";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>SRC Dashboard</title>
      <body className={inter.className}>
        <NextTopLoader color="#2563EB" showSpinner={false} easing="ease-in" />
        <ApolloProvider client={client}>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
