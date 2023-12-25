import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cocode 2.0",
  description:
    "Find the most interesting projects and colabarate building them.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(inter.className, "grid grid-rows-12 w-full h-[100dvh] overflow-x-hidden")}
      >
        <section className="row-span-1 bg-red-50">navbar</section>
        <section className="row-span-11 bg-blue-50">
          <main className="h-full bg-green-50">{children}</main>
          <div className="h-28">footer</div>
        </section>
      </body>
    </html>
  );
}
