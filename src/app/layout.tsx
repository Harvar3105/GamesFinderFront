import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import Navigation from "@/components/layouts/navigation";
import UserProvider from "@/components/providers/userProvider";
import Footer from "@/components/layouts/footer";
import ThemeProvider from "@/components/providers/theme/themeProvider";
import { ETheme } from "@/domain/enums/eTheme";
import TokenProvider from "@/components/providers/tokenProvider";
import { AuthInitializer } from "@/utils/fetch/bff/authInitializer";

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
  const jwt = cookieStore.get("jwt")?.value || null;

  return (
    <html lang="en" data-theme={initialTheme}>
      <body className="flex flex-col min-h-screen">
        <ThemeProvider initialTheme={initialTheme}>
          <TokenProvider initialJwt={jwt}>
            <UserProvider serverUser={null}>
              <AuthInitializer />
              <header>
                <Navigation />
              </header>
              <main className="grow">{children}</main>
              <footer>
                <Footer />
              </footer>
            </UserProvider>
          </TokenProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
