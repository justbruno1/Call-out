import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/background/PageShell";

export const metadata: Metadata = {
  title: "Callout — The Crypto Accountability Protocol",
  description:
    "Callout is a bonded reputation court on GenLayer where evidence-backed accusations are judged by decentralized AI validators and dishonest parties pay the cost.",
  keywords: ["crypto", "accountability", "reputation", "GenLayer", "blockchain", "court"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ backgroundColor: "#080808" }}>
      <body style={{ backgroundColor: "#080808" }}>
        <PageShell>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
        </PageShell>
      </body>
    </html>
  );
}
