import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Modak, Montserrat } from "next/font/google";
import { Suspense } from "react";
import { CustomCursor } from "@/components/custom-cursor";
import { SiteFooter } from "@/components/site-footer";
import { HEADER_HEIGHT, SiteHeader } from "@/components/site-header";
import { ScrollReset, SmoothScroll } from "@/components/smooth-scroll";
import { site } from "@/lib/site";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const modak = Modak({
  variable: "--font-modak",
  weight: "400",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Software, AI & Design`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: site.url,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#070b08",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${modak.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="font-sans">
        <a
          href="#main"
          className="fixed top-3 left-3 z-[60] -translate-y-24 rounded-full bg-mint px-5 py-3 font-bold text-black focus:translate-y-0"
        >
          Skip to content
        </a>
        <SiteHeader />
        <SmoothScroll>
          <div aria-hidden="true" className={HEADER_HEIGHT} />
          <main id="main" tabIndex={-1} className="min-h-[60dvh] outline-none">
            {children}
          </main>
          <SiteFooter />
        </SmoothScroll>
        {/* usePathname needs a Suspense boundary with cacheComponents */}
        <Suspense fallback={null}>
          <ScrollReset />
        </Suspense>
        <CustomCursor />
      </body>
    </html>
  );
}
