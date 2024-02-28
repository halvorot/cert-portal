import "./globals.css";
import Nav from "@/components/Nav";
import { Providers } from "./providers";
import { Container } from "@chakra-ui/react";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Nav />
          <main>
            <Container
              margin="auto"
              marginBottom="5rem"
              maxWidth="container.xl"
              padding="1rem"
            >
              {children}
            </Container>
          </main>
        </Providers>
      </body>
    </html>
  );
}
