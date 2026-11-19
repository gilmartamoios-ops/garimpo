
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GArimpo | Inteligência de busca, descoberta e identificação",
  description:
    "Uma plataforma de busca assistida para descobrir pessoas, profissionais, organizações e conexões em fontes públicas."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
