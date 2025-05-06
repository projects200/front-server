import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "운다방",
  description: "운동매칭 & 운동기록",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = process.env.PUBLIC_GTM_ID;

  return (
    <html lang="en">
      <head>
        {/* GTM Script */}
        <script dangerouslySetInnerHTML={{
          __html:`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','${gtmId}');`
        }}/>

      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* GTM NoScript */}
        <noscript>
          <iframe src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe>
        </noscript>
        {children}
      </body>
    </html>
  );
}
