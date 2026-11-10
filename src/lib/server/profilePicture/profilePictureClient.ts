import "server-only";

import { config } from "@/lib/config";
import ApiClient from "../apiClient";

/** Identity response headers that the BFF passes to the browser together with the picture. */
const FORWARDED_HEADERS = [
  "content-type",
  "etag",
  "last-modified",
  "cache-control",
  "x-content-type-options",
  "content-security-policy",
] as const;

export interface ProfilePictureResult {
  /** 200 with the picture, 304 when the ETag still matches, 404 when the user has no picture (or is unknown). */
  status: 200 | 304 | 404;
  body: ArrayBuffer | null;
  headers: Headers;
}

// FIXME: [Stage5] Upload (PUT, multipart) and delete (DELETE) the signed-in user's own picture.
// FIXME: [Stage6] Moderation: DELETE <endpoint>/<userId>.
/** Identity profile pictures. GET is anonymous, so no token or client IP is sent. */
export class ProfilePictureClient extends ApiClient {
  constructor(uri: string) {
    super(uri);
  }

  /** Other statuses are thrown as axios errors, to be answered with toErrorResponse. */
  async getPicture(userId: string, ifNoneMatch: string | null): Promise<ProfilePictureResult> {
    const response = await this.client.get<ArrayBuffer>(
      `${config.profilePictureEndpoint}/${encodeURIComponent(userId)}`,
      {
        responseType: "arraybuffer",
        headers: ifNoneMatch ? { "If-None-Match": ifNoneMatch } : undefined,
        validateStatus: (status) => status === 200 || status === 304 || status === 404,
      },
    );

    const headers = new Headers();
    for (const name of FORWARDED_HEADERS) {
      const value = response.headers[name];
      if (typeof value === "string") headers.set(name, value);
    }

    const status = response.status as ProfilePictureResult["status"];
    return { status, body: status === 200 ? response.data : null, headers };
  }
}

const globalForClient = globalThis as unknown as {
  profilePictureClient?: ProfilePictureClient;
};

export const profilePictureClient =
  globalForClient.profilePictureClient ?? new ProfilePictureClient(config.identityUri);

globalForClient.profilePictureClient = profilePictureClient;
