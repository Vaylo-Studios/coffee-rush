import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Coffee Rush | Family-Owned Florida Coffee Since 1994",
  description:
    "Coffee Rush is a family-owned Florida coffee company with roots going back to 1994. Local roots, forward motion, across Pinellas, Hillsborough, and Sarasota County.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CafeOrCoffeeShop",
              name: "Coffee Rush",
              description:
                "Family-owned Florida coffee company with roots going back to 1994, serving Pinellas, Hillsborough, and Sarasota County.",
              url: "https://coffee-rush.vercel.app",
              address: {
                "@type": "PostalAddress",
                addressRegion: "FL",
                addressCountry: "US",
              },
              areaServed: ["Pinellas County, FL", "Hillsborough County, FL", "Sarasota County, FL"],
              foundingDate: "1994",
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
