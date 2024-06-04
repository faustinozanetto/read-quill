import React, { memo, useMemo } from 'react';
import type { DashboardReadActivityEntry } from '@modules/dashboard/types/dashboard.types';

interface DashboardReadActivityGraphEntryProps {
  activity: DashboardReadActivityEntry;
}

const DashboardReadActivityGraphEntry: React.FC<DashboardReadActivityGraphEntryProps> = memo(
  (props) => {
    const { activity } = props;

    const styles: React.CSSProperties = useMemo(() => {
      const today = new Date();
      const activityDateIsToday = today.toISOString().split('T')[0] === activity.date;

      if (activityDateIsToday) return { backgroundColor: 'hsl(var(--accent))' };

      if (activity.level > 0) return { backgroundColor: `hsl(var(--primary) / ${(1 / activity.level).toFixed(2)})` };

      return { backgroundColor: 'hsl(var(--foreground) / 0.05)' };
    }, [activity]);

    return <td className="w-[16px] h-[16px] rounded-sm" style={styles} />;
  },
  (prev, next) => prev.activity === next.activity
);

DashboardReadActivityGraphEntry.displayName = 'DashboardReadActivityGraphEntry';

export default DashboardReadActivityGraphEntry;
