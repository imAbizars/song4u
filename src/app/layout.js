import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "./components/footer/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Song4u",
  description: "by Dennis Abizar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      className="text-xl"
      >
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
