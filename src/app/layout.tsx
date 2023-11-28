import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Nav from "@/components/Nav";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "CertPortal",
  description: "The best way to discover easy and useful certifications",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-dark text-light">
        <Nav />
        <main id="main" className="m-auto mb-20 max-w-screen-xl p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
