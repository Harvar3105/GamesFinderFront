export const NavPages = {
  home: "/",
  catalog: "/catalog",
  product: (id: string) => `/catalog/${encodeURIComponent(id)}`,
  account: "/account",
  admin: "/admin",
  login: "/login",
  registration: "/registration",
};
