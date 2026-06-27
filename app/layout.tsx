import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./ThemeProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BlurHalo — feathered backdrop blur around focused content",
  description:
    "A Radix-powered dialog component that paints a feathered backdrop-blur halo around focused surfaces. The content stays sharp while the area around it softly blurs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
