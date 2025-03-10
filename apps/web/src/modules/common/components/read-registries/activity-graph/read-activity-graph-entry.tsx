import React, { memo, useMemo } from 'react';
import { ReadActivityEntry } from '@modules/common/types/common.types';

interface ReadActivityGraphEntryProps {
  activity: ReadActivityEntry;
}

const ReadActivityGraphEntry: React.FC<ReadActivityGraphEntryProps> = memo(
  (props) => {
    const { activity } = props;

    const styles: React.CSSProperties = useMemo(() => {
      const today = new Date();
      const activityDateIsToday = today.toISOString().split('T')[0] === activity.date;

      if (activityDateIsToday) return { backgroundColor: 'hsl(var(--success))' };

      if (activity.level > 0) return { backgroundColor: `hsl(var(--primary) / ${(1 / activity.level).toFixed(2)})` };

      return { backgroundColor: 'hsl(var(--primary) / 0.05)' };
    }, [activity]);

    return <td className="w-[16px] h-[16px] rounded-lg" style={styles} />;
  },
  (prev, next) => prev.activity === next.activity
);

ReadActivityGraphEntry.displayName = 'ReadActivityGraphEntry';

export default ReadActivityGraphEntry;
