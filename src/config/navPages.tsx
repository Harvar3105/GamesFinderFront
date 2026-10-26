export const NavPages = {
  home: "/",
  catalog: "/catalog",
  game: (id: string) => `/catalog/${encodeURIComponent(id)}`,
  account: "/account",
  admin: "/admin",
  login: "/login",
  registration: "/registration",
};
