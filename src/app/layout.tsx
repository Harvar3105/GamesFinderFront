import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import Header from "@/components/layouts/header";
import UserProvider from "@/components/providers/userProvider";
import Footer from "@/components/layouts/footer";
import ThemeProvider from "@/components/providers/theme/themeProvider";
import { ETheme } from "@/domain/entities/enums/ETheme";
import CRTProvider from "@/components/providers/crt/crtProvider";
import AnimationsProvider from "@/components/providers/animations/animationsProvider";
import DesignElement from "@/components/providers/designElement";
import QueryProvider from "@/components/providers/queryProvider";

export const metadata: Metadata = {
  title: "Games Finder",
  description: "A web application to find best game deals, based on your steam wishlist.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //TODO: Cookie request must be presented before actual cookie use.
  const cookieStore = await cookies();
  const initialTheme = cookieStore.get("theme")?.value === ETheme.DARK ? ETheme.DARK : ETheme.LIGHT;
  //TODO: Store session cookie.

  return (
    <html lang="en" data-theme={initialTheme}>
      <body className="flex flex-col min-h-screen">
        <ThemeProvider initialTheme={initialTheme}>
          <CRTProvider initialState={true}>
            <AnimationsProvider initialState={true}>
              <QueryProvider>
                <UserProvider clientUser={null}>
                  <header className="z-99">
                    <Header />
                  </header>
                  <DesignElement>
                    <main className="min-h-screen flex flex-col relative selection:bg-primary/30 selection:text-primary">
                      <div className="grow">{children}</div>
                    </main>
                  </DesignElement>
                  <footer className="z-99">
                    <Footer />
                  </footer>
                </UserProvider>
              </QueryProvider>
            </AnimationsProvider>
          </CRTProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
