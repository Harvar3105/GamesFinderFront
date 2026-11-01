import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { fontVariables } from "./fonts";
import Header from "@/components/layouts/header";
import Footer from "@/components/layouts/footer";
import ThemeProvider from "@/components/providers/theme/themeProvider";
import QueryProvider from "@/components/providers/queryProvider";
import UserProvider from "@/components/providers/userProvider";
import { ETheme } from "@/domain/entities/enums/ETheme";

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
  // FIXME: [Stage2] Read the session by the sessionId cookie and pass its user to UserProvider instead of null.

  return (
    <html lang="en" data-theme={initialTheme} className={fontVariables}>
      <body className="flex min-h-screen flex-col">
        <ThemeProvider initialTheme={initialTheme}>
          <QueryProvider>
            <UserProvider clientUser={null}>
              <Header />
              <main className="flex w-full flex-1 flex-col">{children}</main>
              <Footer />
            </UserProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
