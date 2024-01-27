'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { LandingStatType, LandingStatsGetResponse } from '@modules/api/types/landing-api.types';
import { HOME_STATS } from '@modules/landing/lib/home.lib';
import HomeStatsCard from './home-stats-card';

interface HomeStatsProps {
  stats: LandingStatsGetResponse;
}

const HomeStats: React.FC<HomeStatsProps> = (props) => {
  const { stats } = props;

  return (
    <section className="bg-primary/70 w-full" id="stats">
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-10 md:px-20 md:py-24">
        <motion.h2
          className="mb-4 text-start text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl"
          initial={{ opacity: 0, translateY: -20 }}
          transition={{ delay: 0.15, duration: 0.35 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, translateY: 0 }}
        >
          Read Quill in Numbers
        </motion.h2>

        <motion.p
          className="mb-4 md:mb-8 md:text-lg"
          initial={{ opacity: 0, translateX: -20 }}
          transition={{ delay: 0.25, duration: 0.35 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, translateX: 0 }}
        >
          Delve into the stats that shape Read Quill&apos;s story. From registered books to pages turned, discover the
          collective impact of our community&apos;s reading journey. Join us in celebrating the love for literature that
          unites us all, one page at a time.
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(HOME_STATS).map(([stateKey, statData], index) => {
            const statValue = stats[stateKey as LandingStatType] ?? 0;
            return (
              <motion.div
                initial={{ opacity: 0, translateY: -20 }}
                key={`stat-${stateKey}`}
                transition={{ delay: 0.15 * index + 0.45, duration: 0.35 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, translateY: 0 }}
              >
                <HomeStatsCard title={statData.title} value={statValue} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeStats;
