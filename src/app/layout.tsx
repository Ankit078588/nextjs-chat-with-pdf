import React from 'react';
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "DocuChat AI - Chat with your PDFs",
  description: "A modern, sleek landing page for an AI-powered PDF chat application.",
};


export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased selection:bg-primary-500 selection:text-white">
      <SessionProvider>
        <main className="min-h-screen">{children}</main>
        <Toaster position="top-center" richColors />
      </SessionProvider>
      </body>
    </html>
  );
}