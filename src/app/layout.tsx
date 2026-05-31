import type { Metadata } from "next";
import { Cormorant_Garamond, Lora } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Triveni Gau Sewa Trust | Serving Cow, Serving Humanity",
  description:
    "Triveni Gau Sewa Trust — A sacred organisation dedicated to rescuing, healing, and caring for cows. Gau Seva is God Seva.",
  keywords: ["Gau Sewa", "Cow Rescue", "Gaushala", "Triveni", "Animal Welfare", "India"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${cormorant.variable} ${lora.variable} antialiased`}
        style={{ background: "#0d0700" }}
      >
        {children}
      </body>
    </html>
  );
}
