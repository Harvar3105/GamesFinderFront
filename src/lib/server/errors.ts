import "server-only";

import { isAxiosError } from "axios";
import { NextResponse } from "next/server";
import { logger } from "@/lib/server/auth/logger";

export const SERVER_UNAVAILABLE_MESSAGE =
  "Server is currently unavailable, please try again later.";
const TOO_MANY_REQUESTS_MESSAGE = "Too many attempts. Try again later.";
const REQUEST_FAILED_MESSAGE = "Request failed.";

export class BffError extends Error {
  public readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

interface IdentityError {
  code: string;
  description: string;
}

interface ProblemDetails {
  title?: string;
  detail?: string;
  errors?: Record<string, string[]>;
}

// Identity and the backend answer with a plain string, IdentityError[] (registration),
// ValidationProblemDetails (model validation) or an empty body (rate limiting).
function readUpstreamMessage(data: unknown): string | null {
  if (typeof data === "string") return data.trim() || null;

  if (Array.isArray(data)) {
    const descriptions = data
      .map((item: Partial<IdentityError> | null) => item?.description)
      .filter((description) => typeof description === "string");
    return descriptions.length > 0 ? descriptions.join(" ") : null;
  }

  if (typeof data === "object" && data !== null) {
    const problem = data as ProblemDetails;
    if (problem.errors) return Object.values(problem.errors).flat().join(" ");
    return problem.detail ?? problem.title ?? null;
  }

  return null;
}

function describeError(error: unknown): { status: number; message: string } {
  if (error instanceof BffError) return { status: error.status, message: error.message };

  if (isAxiosError(error) && error.response) {
    const { status, data } = error.response;

    if (status >= 500) {
      logger.error({
        msg: "Upstream server error",
        data: { url: error.config?.url, status, data },
      });
      return { status, message: SERVER_UNAVAILABLE_MESSAGE };
    }

    const fallback = status === 429 ? TOO_MANY_REQUESTS_MESSAGE : REQUEST_FAILED_MESSAGE;
    return { status, message: readUpstreamMessage(data) ?? fallback };
  }

  if (isAxiosError(error)) {
    logger.error({
      msg: "Upstream server is unreachable",
      data: { url: error.config?.url, code: error.code },
    });
    return { status: 503, message: SERVER_UNAVAILABLE_MESSAGE };
  }

  logger.error({ msg: "Unexpected BFF error", data: error instanceof Error ? error : { error } });
  return { status: 500, message: SERVER_UNAVAILABLE_MESSAGE };
}

export function toErrorResponse(error: unknown): NextResponse {
  const { status, message } = describeError(error);

  return NextResponse.json(message, { status });
}
