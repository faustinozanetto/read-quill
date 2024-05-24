import { Redis } from 'ioredis';

export const redis =
  process.env.NODE_ENV === 'production'
    ? new Redis(process.env.UPSTASH_REDIS!)
    : new Redis({ host: '172.27.187.93', port: 6379 });
