import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import SessionWrapper from '@/components/SessionWrapper';

export const metadata = {
  title: "Mini Car App",
  description: "Test App",
};


export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
    </SessionWrapper>
  );
}
