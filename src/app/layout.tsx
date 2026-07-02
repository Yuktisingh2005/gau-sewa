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
  keywords: [
  "Gau Sewa",
  "Gau Seva",
  "Cow Rescue",
  "Cow Protection",
  "Cow Shelter",
  "Cow Care",
  "Cow Welfare",
  "Cow Rehabilitation",
  "Cow Healing",
  "Cow Treatment",
  "Cow Adoption",
  "Cow Sanctuary",
  "Gaushala",
  "Goshala",
  "Gau Shala",
  "Animal Shelter",
  "Animal Rescue",
  "Animal Welfare",
  "Animal Care",
  "Animal Rehabilitation",
  "Animal Healing",
  "Animal Protection",
  "Rescue Animals",
  "Abandoned Animals",
  "Injured Animals",
  "Stray Animal Care",
  "Stray Cow Rescue",
  "Disabled Animals",
  "Emergency Animal Rescue",
  "Animal Treatment",
  "Animal Medical Care",
  "Wildlife Rescue",
  "Compassion",
  "Kindness",
  "Humanity",
  "Volunteer",
  "Volunteer for Animals",
  "Donate for Cows",
  "Donate for Animal Welfare",
  "Cow Donation",
  "Charity",
  "Nonprofit",
  "NGO",
  "Animal NGO",
  "Cow NGO",
  "Animal Trust",
  "Animal Foundation",
  "Cow Feeding",
  "Feed Cows",
  "Save Cows",
  "Save Animals",
  "Protect Cows",
  "Protect Animals",
  "Rescue Foundation",
  "Healing",
  "Recovery",
  "Rehabilitation Center",
  "Animal Sanctuary",
  "Cow Sanctuary India",
  "Animal Rescue India",
  "Gaushala India",
  "Cow Welfare India",
  "Animal Welfare India",
  "Sacred Cow",
  "Gau Mata",
  "Gau Mata Seva",
  "Gau Raksha",
  "Gau Raksha Seva",
  "Gau Daan",
  "Cow Conservation",
  "Livestock Care",
  "Cattle Shelter",
  "Cattle Rescue",
  "Cattle Welfare",
  "Animal Compassion",
  "Rescued Cows",
  "Cow Foster Care",
  "Cow Health",
  "Cow Nutrition",
  "Animal Nutrition",
  "Animal Recovery",
  "Cow Hospital",
  "Stray Cattle",
  "Homeless Animals",
  "Compassion for Animals",
  "Animal Welfare Organization",
  "Cow Rescue Organization",
  "Best Gaushala",
  "Cow Shelter India",
  "Help Injured Animals",
  "Help Stray Animals",
  "Support Animal Rescue",
  "Support Gaushala",
  "Donate to Gaushala",
  "Donate to Animal Shelter",
  "Triveni",
  "Triveni Gau Sewa Trust",
  "Triveni Gaushala",
  "Triveni Animal Rescue",
  "Triveni Cow Shelter",
  "India",
  "Delhi",
  "Gau Seva Trust",
  "Cow Protection Trust",
  "Animal Shelter Trust",
  "Cow Welfare Trust",
  "Animal Rescue NGO"
],
  icons: {
    icon: "/images/favicon.png",
  },
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
