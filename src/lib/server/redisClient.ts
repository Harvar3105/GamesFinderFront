import "server-only";

import { createClient, type RedisClientType } from "redis";
import { config } from "../config";
import { logger } from "./logger";

export class RedisClient {
  private readonly client: RedisClientType;

  constructor(host: string, port: number, password: string, database: number) {
    this.client = createClient({
      socket: {
        host,
        port,
      },
      password,
      database,
    });

    this.client.on("error", (error) => {
      logger.error({ msg: "Redis error:", data: error });
    });
  }

  async connect(): Promise<void> {
    if (!this.client.isOpen) {
      await this.client.connect();
    }
  }

  async get(key: string): Promise<string | null> {
    await this.connect();

    return this.client.get(key);
  }

  async set(key: string, value: string, expirationSeconds?: number): Promise<void> {
    await this.connect();

    if (expirationSeconds !== undefined) {
      await this.client.set(key, value, {
        EX: expirationSeconds,
      });

      return;
    }

    await this.client.set(key, value);
  }

  async delete(key: string): Promise<void> {
    await this.connect();

    await this.client.del(key);
  }

  async exists(key: string): Promise<boolean> {
    await this.connect();

    return (await this.client.exists(key)) === 1;
  }

  async expire(key: string, seconds: number): Promise<void> {
    await this.connect();

    await this.client.expire(key, seconds);
  }

  async disconnect(): Promise<void> {
    if (this.client.isOpen) {
      await this.client.quit();
      logger.info({ msg: "Connection to redis closed!" });
    }
  }
}

const globalForRedis = globalThis as unknown as {
  redis?: RedisClient;
};

export const redis =
  globalForRedis.redis ??
  new RedisClient(config.redisHost, config.redisPort, config.redisPassword, config.redisDB);

globalForRedis.redis = redis;
