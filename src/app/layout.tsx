import type { Metadata } from "next";
import { Geist, Geist_Mono, Vazirmatn } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { I18nProvider } from "@/lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Persian / Arabic-script font. Loaded with ONLY the arabic subset so
// Latin characters skip it and fall through to Geist.
const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aria Nova — AI Business Intelligence & Automation Consultant",
  description:
    "Consultant and specialist in business automation and AI-driven optimization. Web developer crafting premium, high-performance digital products.",
  keywords: [
    "AI automation",
    "business intelligence",
    "automation consultant",
    "web developer",
    "AI optimization",
  ],
  authors: [{ name: "Aria Nova" }],
  openGraph: {
    title: "Aria Nova — AI Business Intelligence & Automation Consultant",
    description:
      "Consultant and specialist in business automation and AI-driven optimization.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${vazirmatn.variable} font-sans antialiased bg-background text-foreground`}
      >
        <I18nProvider>
          <div className="relative flex min-h-screen flex-col">
            {children}
          </div>
          <Toaster />
        </I18nProvider>
      </body>
    </html>
  );
}
