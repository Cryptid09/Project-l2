
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Providers } from "./providers"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Portfolio",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="w-screen overflow-x-hidden">
       <Providers> <Navbar className=''/></Providers>
        <Providers>{children}</Providers> 
        <Footer />
      </body>
    </html>
  );
}
