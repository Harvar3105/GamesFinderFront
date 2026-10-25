import "server-only";

export type LogLevel = "INFO" | "WARN" | "ERROR";

export interface LogContext {
  [key: string]: unknown;
}

function serializeError(error: Error) {
  return {
    name: error.name,
    message: error.message,
    stack: error.stack,
  };
}

function writeLog(
  level: LogLevel,
  message: string,
  context?: LogContext | Error,
  logData?: object,
): void {
  const entry = {
    timestamp: new Date().toISOString(),
    level: level,
    message: message,
    ctx: context instanceof Error ? { error: serializeError(context) } : context ? { context } : {},
    data: logData,
  };

  const output = JSON.stringify(entry);

  switch (level) {
    case "INFO":
      console.info(output);
      break;

    case "WARN":
      console.warn(output);
      break;

    case "ERROR":
      console.error(output);
      break;
  }
}

export type LoggerParams = {
  msg: string;
  ctx?: LogContext;
  data?: object;
};

export const logger = {
  info({ msg, ctx, data }: LoggerParams): void {
    writeLog("INFO", msg, ctx, data);
  },

  warn({ msg, ctx, data }: LoggerParams): void {
    writeLog("WARN", msg, ctx, data);
  },

  error({ msg, ctx, data }: LoggerParams): void {
    writeLog("ERROR", msg, ctx, data);
  },
};
