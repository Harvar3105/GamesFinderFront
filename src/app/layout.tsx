import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import "./globals.css";
import Navigation from "@/components/layouts/Navigation";
import UserProvider from "@/components/providers/UserProvider";
import Footer from "@/components/layouts/Footer";
import ThemeProvider from "@/components/theme/ThemeProvider";
import { ETheme } from "domain/enums/ETheme";

export const metadata: Metadata = {
  title: "Games Finder",
  description: "A web application to find best game deals, based on your steam wishlist.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const initialTheme = cookieStore.get("theme")?.value === ETheme.DARK ? ETheme.DARK : ETheme.LIGHT;

  return (
    <html lang="en" data-theme={initialTheme}>
      <body className="flex flex-col min-h-screen">
        <ThemeProvider initialTheme={initialTheme}>
          <UserProvider serverUser={null}>
            <header>
              <Navigation />
            </header>
            <main className="grow">{children}</main>
            <footer>
              <Footer />
            </footer>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
