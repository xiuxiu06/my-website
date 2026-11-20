import type { Metadata } from "next";
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
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${modak.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="font-sans">
        <SiteHeader />
        <SmoothScroll>
          <div aria-hidden="true" className={HEADER_HEIGHT} />
          <main className="min-h-[60dvh]">{children}</main>
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
