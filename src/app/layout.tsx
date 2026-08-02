import type { Metadata } from "next";
import { Fraunces, Geist_Mono, Sora } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";


const sora = Sora({
  variable: "--font-body",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muhammad Rayasya Dziqi Cahyana — Fullstack Software Engineer",
  description:
    "Portofolio interaktif Fullstack Software Engineer oleh Muhammad Rayasya Dziqi Cahyana. Menampilkan proyek REST API, arsitektur database PostgreSQL, dan antarmuka web modern.",
  keywords: [
    "Fullstack Engineer",
    "Software Engineer",
    "Muhammad Rayasya Dziqi Cahyana",
    "rayrayaray",
    "Next.js 16",
    "React 19",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
  ],
  authors: [{ name: "Muhammad Rayasya Dziqi Cahyana" }],
  openGraph: {
    title: "Muhammad Rayasya Dziqi Cahyana — Fullstack Software Engineer",
    description:
      "Interactive Terminal & IDE Workspace Portfolio of Fullstack Software Engineer Muhammad Rayasya Dziqi Cahyana.",
    type: "website",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="id" suppressHydrationWarning>
        <body
          className={`${sora.variable} ${fraunces.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
