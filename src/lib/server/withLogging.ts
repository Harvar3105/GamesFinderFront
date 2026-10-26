import type { NextRequest } from "next/server";
import { logger } from "./logger";

type RouteHandler = (request: NextRequest, context: unknown) => Response | Promise<Response>;

export function withLogging(handler: RouteHandler): RouteHandler {
  return async (request, context) => {
    const start = performance.now();

    logger.info({
      msg: "BFF request",
      ctx: {
        method: request.method,
        url: request.url,
      },
    });

    try {
      const response = await handler(request, context);
      const duration = Math.round(performance.now() - start);

      if (response.status >= 400) {
        logger.error({
          msg: "BFF request failed",
          ctx: {
            method: request.method,
            url: request.url,
            status: response.status,
            duration,
          },
        });
      }

      return response;
    } catch (error) {
      const duration = Math.round(performance.now() - start);

      logger.error({
        msg: "BFF request threw an exception",
        ctx: {
          method: request.method,
          url: request.url,
          status: 500,
          duration,
          error: error instanceof Error ? error.message : String(error),
        },
      });

      throw error;
    }
  };
}
