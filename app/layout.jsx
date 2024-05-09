import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from '@/components/SessionWrapper';
import {Toaster} from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

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
