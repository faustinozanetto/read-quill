import { useCallback, useMemo } from 'react';

interface UseReadActivityGraphReturn {
  /**
   * Maps the activity value to a level based on predefined thresholds.
   * @param activityValue - The activity value.
   * @returns The mapped activity level.
   */
  mapActivityToLevel: (activityValue: number) => number;
  /**
   * Calculates the start date for the read activity graph.
   * @param daysBack - The number of days to go back from today.
   * @returns The calculated start date.
   */
  calculateStartDate: (daysBack?: number) => Date;
  ACTIVITY_THRESHOLDS: number[];
}

export const useReadActivityGraph = (): UseReadActivityGraphReturn => {
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

  const calculateStartDate = useCallback((daysBack = 7) => {
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());

    startDate.setDate(startDate.getDate() - daysBack);
    return startDate;
  }, []);

  return { mapActivityToLevel, calculateStartDate, ACTIVITY_THRESHOLDS };
};
