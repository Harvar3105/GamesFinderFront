/** BFF routes (src/app/api) the browser calls. */
export const BffRoutes = {
  login: "/api/login",
  registration: "/api/registration",
  logout: "/api/logout",
  logoutAll: "/api/logout-all",
  session: "/api/session",
  games: "/api/games",
  game: (id: string) => `/api/games/${encodeURIComponent(id)}`,
  profilePicture: (userId: string) => `/api/profilePicture/${encodeURIComponent(userId)}`,
};
