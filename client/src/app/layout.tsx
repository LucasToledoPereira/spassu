import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { Container } from "@ui/container";
import { Menu, MenuItem } from "@ui/menu";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spassu Book App",
  description: "Spassu Book App - Simple Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Container>
          <Menu>
            <MenuItem text='Início' path='/' match/>
            <MenuItem text='Autores' path='/authors'/>
            <MenuItem text='Assuntos' path='/subjects'/>
            <MenuItem text='Livros' path='/books'/>
          </Menu>
          {children}
        </Container>
        <ToastContainer />
      </body>
    </html>
  );
}
