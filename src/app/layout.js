import "./globals.css";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "./components/footer/Footer";


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
