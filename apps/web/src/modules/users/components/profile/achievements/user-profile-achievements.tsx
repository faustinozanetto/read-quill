'use client';

import React from 'react';
import { __URL__ } from '@modules/common/lib/common.constants';

import { useParams } from 'next/navigation';

import UserProfileAchievementsHeader from './user-profile-achievements-header';
import { useUnLockedAchievements } from '@modules/achievements/hooks/use-un-locked-achievements';
import UserUnLockedAchievementCard from '@modules/achievements/components/cards/un-lockeed/user-un-locked-achievement-card';
import { useAuthContext } from '@modules/auth/hooks/use-auth-context';
import UserUnLockedAchievementCardPlaceholder from '@modules/achievements/components/cards/un-lockeed/user-un-locked-achievement-card-placeholder';
import { BookIcon, Button, ExclamationIcon, Separator } from '@read-quill/design-system';
import Link from 'next/link';

const UserProfilAchievements: React.FC = () => {
  const params = useParams<{ userId: string }>();
  const { user } = useAuthContext();

  const { data, isLoading } = useUnLockedAchievements({ userId: params.userId });

  const isProfileOwner = Boolean(user?.id === params.userId);

  return (
    <div className="flex flex-col gap-2 rounded-lg p-4 shadow border">
      <UserProfileAchievementsHeader />

      {isLoading ? (
        <div className="grid gap-2.5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 grow h-fit">
          {Array.from({ length: 4 }).map((_, i) => (
            <UserUnLockedAchievementCardPlaceholder key={`unlocked-achievement-card-placeholder-${i}`} />
          ))}
        </div>
      ) : null}

      {!isLoading && data?.data?.unLockedAchievements.length ? (
        <div className="flex flex-col space-y-4">
          <div className="grid gap-2.5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 grow h-fit">
            {data.data.unLockedAchievements.map((unlockedAchievement) => (
              <UserUnLockedAchievementCard
                key={`unlocked-achievement-card-${unlockedAchievement.id}`}
                userAchievement={unlockedAchievement}
                showPinButton={isProfileOwner}
              />
            ))}
          </div>
          {!isProfileOwner && (
            <>
              <Separator />
              <Button className="w-full md:w-fit md:ml-auto" asChild>
                <Link
                  href={`/users/${params.userId}/achievements`}
                  title="See More Achievements"
                  aria-label="See More Achievements"
                >
                  <BookIcon className="mr-2" />
                  See More Achievements
                </Link>
              </Button>
            </>
          )}
        </div>
      ) : null}

      {!isLoading && !data?.data?.unLockedAchievements.length ? (
        <div className="flex items-center justify-center gap-2">
          <div className="bg-primary p-2 rounded-lg border">
            <ExclamationIcon className="stroke-primary-foreground" />
          </div>
          <p>It looks like this user hasn't unlocked achievements yet!</p>
        </div>
      ) : null}
    </div>
  );
};

export default UserProfilAchievements;
