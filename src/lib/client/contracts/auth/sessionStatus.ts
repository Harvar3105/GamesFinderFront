/** `GET /api/session` and `POST /api/session`: the remaining lifetime of the current session. */
export default interface SessionStatus {
  /** Persistent sessions ("Remember me") are not tracked by the client. */
  keepSignedIn: boolean;
  expiresInSeconds: number;
  /** The client warns the user once expiresInSeconds drops to this value. */
  warnBeforeExpirySeconds: number;
}
