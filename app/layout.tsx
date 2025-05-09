import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export const metadata: Metadata = {
  title: {
    default: "HERN1k | Vlad Hirnyk",
    template: "%s | HERN1k",
  },
  description: "Student, software developer",
  openGraph: {
    title: "HERN1k | Vlad Hirnyk",
    description: "Student, software developer",
    url: "https://hern1k.xyz",
    siteName: "hern1k.xyz",
    images: ["https://hern1k.xyz/favicon.png"],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "HERN1k",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.png",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
      <body
        className={`bg-black ${process.env.NODE_ENV === "development" ? "debug-screens" : undefined }`}
      >
        {children}
      </body>
    </html>
  );
}
