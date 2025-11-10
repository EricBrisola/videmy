import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Videmy",
  description: "Aplicação Videmy para o acervo de vídeos didáticos",
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        <Navbar />
        <main className="bg-main-bg flex w-full flex-1">
          {children}
          <ToastContainer />
        </main>
      </body>
    </html>
  );
}
