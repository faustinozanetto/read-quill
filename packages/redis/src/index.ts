import { Redis } from 'ioredis';

export const redis = new Redis(process.env.UPSTASH_REDIS!);
// export const redis =
//   process.env.NODE_ENV === 'production'
//     ? new Redis(process.env.UPSTASH_REDIS!)
//     : new Redis({
//         host: '172.20.143.242',
//         port: 6379,
//         tls: {
//           rejectUnauthorized: false,
//         },
//       });
