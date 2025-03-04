import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';
import { CacheDBGateway } from 'src/cache/cacheGateway';

@Injectable()
export class RedisService extends CacheDBGateway {
  constructor(@InjectRedis() private readonly redis: Redis) {
    super();
  }

  public async setCache(
    key: string,
    value: string,
    ttl: number = 60,
  ): Promise<string> {
    await this.redis.set(key, value, 'EX', ttl);
    return value;
  }

  public async getCache(key: string): Promise<string | null> {
    return await this.redis.get(key);
  }

  public async clearCache(): Promise<void> {
    await this.redis.flushdb();
  }
}
