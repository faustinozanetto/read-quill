import { useCallback, useMemo } from 'react';

interface UseReadActivityGraphReturn {
  /**
   * Maps the activity value to a level based on predefined thresholds.
   * @param activityValue - The activity value.
   * @returns The mapped activity level.
   */
  mapActivityToLevel: (activityValue: number) => number;
  ACTIVITY_THRESHOLDS: number[];
  startDate: Date;
  daysPerRow: number;
}

interface UseReadActivityGraphParams {
  daysPerRow: number;
  daysBack: number;
}

export const useReadActivityGraph = (
  params: UseReadActivityGraphParams = { daysPerRow: 50, daysBack: 7 }
): UseReadActivityGraphReturn => {
  const { daysPerRow, daysBack } = params;

  const ACTIVITY_THRESHOLDS = useMemo(() => [0, 5, 10, 20, 50, 100], []);

  const mapActivityToLevel = useCallback(
    (activityValue: number) => {
      for (let i = ACTIVITY_THRESHOLDS.length - 1; i >= 0; i--) {
        if (activityValue >= ACTIVITY_THRESHOLDS[i]) {
          return i;
        }
      }

      return 0;
    },
    [ACTIVITY_THRESHOLDS]
  );

  const startDate = useMemo(() => {
    const today = new Date();
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());

    date.setDate(date.getDate() - daysBack);
    return date;
  }, [daysBack]);

  return { mapActivityToLevel, startDate, ACTIVITY_THRESHOLDS, daysPerRow };
};
