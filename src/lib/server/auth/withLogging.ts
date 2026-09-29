import type { NextRequest } from "next/server";
import { logger } from "./logger";

type RouteHandler = (request: NextRequest, context: unknown) => Response | Promise<Response>;

export function withLogging(handler: RouteHandler): RouteHandler {
  return async (request, context) => {
    const start = performance.now();

    logger.info("BFF request", {
      method: request.method,
      url: request.url,
    });

    try {
      const response = await handler(request, context);
      const duration = Math.round(performance.now() - start);

      if (response.status >= 400) {
        logger.error("BFF request failed", {
          method: request.method,
          url: request.url,
          status: response.status,
          duration,
        });
      }

      return response;
    } catch (error) {
      const duration = Math.round(performance.now() - start);

      logger.error("BFF request threw an exception", {
        method: request.method,
        url: request.url,
        status: 500,
        duration,
        error: error instanceof Error ? error.message : String(error),
      });

      throw error;
    }
  };
}
