import type { Metadata } from "next";
import { Source_Sans_3 as FontSans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/navbar";
// import Footer from "@/components/common/footer";

const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: "Viren Portfolio",
  description: "Personal Portfolio",
  icons: {
    icon: '/favicon.ico'
  },
  openGraph: {
    images: [
      {
        url: '/images/opengraph-image.png',
      },
    ],
  },
  metadataBase: new URL('https://virenportfolio.com'),
  alternates: {
    canonical: 'https://virenportfolio.com'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} font-sans antialiased`}
      >
        <div className="relative min-h-screen">
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
          {/* <Footer /> */}
        </div>
      </body>
    </html>
  );
}
