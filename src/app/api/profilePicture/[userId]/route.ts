import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_AVATAR } from "@/config/assets";
import { toErrorResponse } from "@/lib/server/errors";
import { profilePictureClient } from "@/lib/server/profilePicture/profilePictureClient";

// Anonymous, like the Identity endpoint, so <img> tags can load any user's picture. The ETag is passed both
// ways, so the browser revalidates the picture and gets 304 while it has not changed.
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const { userId } = await params;

  try {
    const picture = await profilePictureClient.getPicture(
      userId,
      request.headers.get("if-none-match"),
    );

    // No picture: the default one, so <img> needs no fallback of its own. The redirect is not stored,
    // so a picture uploaded later is requested on the next load.
    if (picture.status === 404) {
      const response = NextResponse.redirect(new URL(DEFAULT_AVATAR, request.url), 302);
      response.headers.set("Cache-Control", "no-store");
      return response;
    }

    return new NextResponse(picture.body, { status: picture.status, headers: picture.headers });
  } catch (error) {
    return toErrorResponse(error);
  }
}
