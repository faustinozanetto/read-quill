import React from 'react';
import {
  Badge,
  Button,
  CalendarIcon,
  LoadingIcon,
  ThropyIcon,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  useToast,
} from '@read-quill/design-system';
import type { AchievementWithUserAchievement } from '@modules/achievements/types/achievements.types';
import { ACHIEVEMENT_DISPLAY_CRITERIAS } from '@modules/achievements/lib/achievement.constants';
import { PinnedIcon, PinnedOffIcon } from '@read-quill/design-system/src';
import { useAchievementTogglePinned } from '@modules/achievements/hooks/use-achievement-toggle-pinned';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useAuthContext } from '@modules/auth/hooks/use-auth-context';

/**
 * Props for the UserUnLockedAchievementCard component.
 */
interface UserUnLockedAchievementCardProps {
  /**
   * Information about the unlocked achievement associated with the user.
   */
  userAchievement: AchievementWithUserAchievement;
  showPinButton?: boolean;
}

const UserUnLockedAchievementCard: React.FC<UserUnLockedAchievementCardProps> = (props) => {
  const { userAchievement, showPinButton = false } = props;

  const queryClient = useQueryClient();

  const { toast } = useToast();

  const { achievementTogglePinned, isPending } = useAchievementTogglePinned({
    onSuccess: async (data) => {
      if (data.data) {
        toast({ variant: 'success', content: 'Achievement pinned updated successfully!' });
        await queryClient.refetchQueries({
          queryKey: ['achivements-un-locked'],
        });
        await queryClient.refetchQueries({
          queryKey: ['achivements-pinned'],
        });
      }
    },
  });

  const handleTogglePinned = async () => {
    await achievementTogglePinned({
      achievementId: userAchievement.id,
    });
  };

  const label = userAchievement.isPinned ? 'Unpin Achievement' : 'Pin Achievement';

  return (
    <div className="rounded-lg border p-2.5 transition-transform hover:scale-[101%] shadow flex flex-col items-center justify-start text-center hover:border-primary relative">
      {showPinButton && (
        <div className="absolute top-4 right-4">
          <Button
            size="icon"
            variant="outline"
            aria-label={label}
            title={label}
            onClick={handleTogglePinned}
            disabled={isPending}
          >
            {isPending ? <LoadingIcon /> : userAchievement.isPinned ? <PinnedOffIcon /> : <PinnedIcon />}
          </Button>
        </div>
      )}

      <ThropyIcon className="w-14 h-14 sm:w-16 sm:h-16 bg-primary p-2 rounded-lg shadow-lg mb-1 stroke-accent" />
      <span className="font-bold uppercase block">{userAchievement.name}</span>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="flex gap-2 items-center justify-center mb-2">
            <CalendarIcon className="stroke-current" />
            {userAchievement.unlockedAt ? (
              <span className="font-medium text-sm">
                {new Date(userAchievement.unlockedAt).toLocaleDateString('en-US', { dateStyle: 'medium' })}
              </span>
            ) : null}
          </TooltipTrigger>
          <TooltipContent>Unlocked Date</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {userAchievement.criteria ? (
        <div role="list" className="flex flex-wrap gap-1.5 my-auto justify-center items-center">
          {Object.entries(userAchievement.criteria).map(([criteriaName, criteriaValue]) => (
            <Badge key={criteriaName} role="listitem" className="text-pretty">
              {ACHIEVEMENT_DISPLAY_CRITERIAS[criteriaName] || criteriaName} {criteriaValue}
            </Badge>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default UserUnLockedAchievementCard;
