import { redis } from '@read-quill/redis';
import { VoteThreadType } from '../types/community-thread-validations.types';

/**
 * Function for storing the vote of a user for a thread in redis store.
 * @param threadId Thread id.
 * @param userId User id.
 * @param type Vote type.
 * @returns if successful or not.
 */
export const storeUserThreadVoteInRedis = async (
  threadId: string,
  userId: string,
  type: VoteThreadType
): Promise<boolean> => {
  const key = `thread:${threadId}:${type}s`;
  const oppositeKey = `thread:${threadId}:${type === 'upvote' ? 'downvote' : 'upvote'}s`;

  const isMember = await redis.sismember(key, userId);
  if (isMember) return false;

  // Remove the user from the opposite set and add to the new one.
  await redis.srem(oppositeKey, userId);
  await redis.sadd(key, userId);

  return true;
};
