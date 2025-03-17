import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sua Mãe Merece um Império!",
  description: "Se você fez compras acima de R$100,00, preencha o formulário e concorra a premios em dinheiro ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
