/** BFF routes (src/app/api) the browser calls. */
export const BffRoutes = {
  login: "/api/login",
  registration: "/api/registration",
  logout: "/api/logout",
  logoutAll: "/api/logout-all",
  session: "/api/session",
  games: "/api/games",
  vendors: "/api/vendors",
  tags: "/api/tags",
  game: (id: string) => `/api/games/${encodeURIComponent(id)}`,
  gameOffers: (id: string) => `/api/games/${encodeURIComponent(id)}/offers`,
  profilePicture: (userId: string) => `/api/profilePicture/${encodeURIComponent(userId)}`,
};
