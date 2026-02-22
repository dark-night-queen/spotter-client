import "./globals.css";

import type { Metadata } from "next";
import { Lato } from "next/font/google";

import { ThemeProvider } from "@/lib/providers/theme-provider";
import { QueryProvider } from "@/lib/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";

const latoSans = Lato({
  variable: "--font-lato-sans",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Spotter",
  description: "Find your next stop with Spotter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${latoSans.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>{children}</QueryProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
