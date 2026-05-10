import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "AliOS 95 — Ali Nasser Portfolio",
  description:
    "A 1990s desktop OS portfolio for Ali Nasser — full-stack developer.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
