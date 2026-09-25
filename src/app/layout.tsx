import type { Metadata } from "next";
import { Geist } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const orcish = localFont({
  src: "../../orcish-regular/OrcishRegular-Regular.otf",
  variable: "--font-orcish",
  weight: "400",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Liberty Landscapes | Thoughtful Outdoor Spaces",
  description:
    "Design-led landscaping and beautifully crafted outdoor spaces for homes across the Philadelphia suburbs.",
  keywords: [
    "landscape design",
    "garden design",
    "outdoor living",
    "hardscaping",
    "Philadelphia landscaping",
  ],
  openGraph: {
    title: "Liberty Landscapes",
    description: "Make more of life outside.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geist.variable} ${orcish.variable}`}>
      <body>{children}</body>
    </html>
  );
}
