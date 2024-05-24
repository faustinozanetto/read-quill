import { redis } from '@read-quill/redis';
import { v4 as uuidv4 } from 'uuid';

export const incrementThreadView = async (threadId: string, userId?: string, ip?: string) => {
  // Generate a unique identifier for anonymous users based on IP
  const uniqueUserId = userId || (ip ? `anon-${ip}-${uuidv4()}` : null);
  if (!uniqueUserId) {
    return;
  }

  // Increment the total views count
  await redis.incr(`thread:views:${threadId}`);

  const uniqueViewKey = `thread:unique_views:${threadId}:${uniqueUserId}`;
  const userAlreadyViewed = await redis.get<string>(uniqueViewKey);
  if (!userAlreadyViewed) {
    // Mark this user as having viewed
    const expiry = 86400; // 1 day
    await redis.set(uniqueViewKey, '1', { ex: expiry });
    // Increment unique views count
    await redis.incr(`thread:unique_views:${threadId}`);
  }
};

export const getThreadViews = async (threadId: string) => {
  const pipeline = redis.pipeline();

  pipeline.get(`thread:views:${threadId}`);
  pipeline.get(`thread:unique_views:${threadId}`);

  const [totalCount, uniqueCount] = await pipeline.exec<string[]>();

  return {
    total: totalCount ? parseInt(totalCount, 10) : 0,
    unique: uniqueCount ? parseInt(uniqueCount, 10) : 0,
  };
};
