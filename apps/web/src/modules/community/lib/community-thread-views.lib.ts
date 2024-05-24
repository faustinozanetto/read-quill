import { redis } from '@read-quill/redis';
import { v4 as uuidv4 } from 'uuid';
import { ThreadViews } from '../types/community.types';

export const incrementThreadView = async (threadId: string, userId?: string, ip?: string) => {
  // Generate a unique identifier for anonymous users based on IP
  const uniqueUserId = userId || (ip ? `anon-${ip}-${uuidv4()}` : null);
  if (!uniqueUserId) {
    return;
  }

  // Increment the total views count
  await redis.incr(`thread:views:${threadId}`);

  const uniqueViewKey = `thread:unique_views:${threadId}:${uniqueUserId}`;
  const userAlreadyViewed = await redis.get(uniqueViewKey);

  if (userAlreadyViewed !== '1') {
    // Mark this user as having viewed
    const expiry = 86400; // 1 day
    await redis.set(uniqueViewKey, 1, 'EX', expiry);
    // Increment unique views count
    await redis.incr(`thread:unique_views:${threadId}`);
  }
};

export const getThreadViews = async (threadId: string): Promise<ThreadViews> => {
  const pipeline = redis.pipeline();

  pipeline.get(`thread:views:${threadId}`);
  pipeline.get(`thread:unique_views:${threadId}`);

  const result = await pipeline.exec();
  if (!result) {
    return {
      total: 0,
      unique: 0,
    };
  }

  const [totalCount, uniqueCount] = result;

  return {
    total: totalCount[1] ? parseInt(totalCount[1] as string, 10) : 0,
    unique: uniqueCount[1] ? parseInt(uniqueCount[1] as string, 10) : 0,
  };
};
