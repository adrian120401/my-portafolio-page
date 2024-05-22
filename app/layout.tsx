import "../global.css";
import { Inter } from "@next/font/google";
import LocalFont from "@next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";

export const metadata: Metadata = {
  title: {
    default: "Adrian de los Reyes",
    template: "%s | adriandelosreyes",
  },
  description: "Adrian de los Reyes portafolio, as a backend developer I have a lot of project to show you, come and see my work",
  openGraph: {
    title: "adriandelosreyes",
    description:
      "Backend developer",
    url: "https://adriandelosreyes.vercel.app/",
    siteName: "adriandelosreyes",
    locale: "en-US",
    type: "website",
  },
  verification: {
    google: "B9XTIQbzFtBqYUQc_f8qTbTMMDBl-THrDT5fpnuyQOI",
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
  icons: {
    shortcut: "/coding.png",
  },
};
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
      <head>
        <meta name="google-site-verification" content="B9XTIQbzFtBqYUQc_f8qTbTMMDBl-THrDT5fpnuyQOI"></meta>
        <Analytics />
      </head>
      <body
        className={`bg-black ${process.env.NODE_ENV === "development" ? "debug-screens" : undefined
          }`}
      >
        {children}
      </body>
    </html>
  );
}
