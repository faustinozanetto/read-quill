'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChartIcon, MedalIcon, TargetIcon } from '@read-quill/design-system/src';
import HomeFeaturesCard from './home-features-card';
import HomeFeaturesMoreCard from './home-features-more-card';

const HOME_FEATURES: React.ComponentPropsWithoutRef<typeof HomeFeaturesCard>[] = [
  {
    content: 'Set daily, weekly, and monthly reading goals that match your pace and preferences.',
    title: 'Personalized Reading Targets',
    icon: <TargetIcon className="w-12 h-12" />,
  },
  {
    content: 'Celebrate reading milestones and unlock rewards with achievements and badges.',
    title: 'Achievements and Badges',
    icon: <MedalIcon className="w-12 h-12" />,
  },
  {
    content: 'Gain valuable insights into your reading habits through charts and statistics.',
    title: 'Reading Insights',
    icon: <ChartIcon className="w-12 h-12" />,
  },
  {
    content: 'Monitor your reading progress and visualize accomplishments effortlessly.',
    title: 'Progress Tracking',
    icon: <ChartIcon className="w-12 h-12" />,
  },
];

const HOME_MORE_FEATUES: React.ComponentPropsWithoutRef<typeof HomeFeaturesMoreCard>[] = [
  {
    title: 'Reading Challenges',
  },
  { title: 'Book Reviews' },
  { title: 'Annotations' },
];

const HomeFeatures: React.FC = () => {
  return (
    <section className="w-full" id="features">
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-10 md:px-20 md:py-24 relative">
        <div className="relative mx-auto max-w-2xl text-center z-20 backdrop-blur-xl">
          <motion.h2
            className="font-display text-4xl font-extrabold sm:text-5xl"
            initial={{ opacity: 0, translateX: 20 }}
            transition={{ delay: 0.25, duration: 0.35 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, translateX: 0 }}
          >
            These are just <br /> <span className="text-primary">some</span> of our features
          </motion.h2>
          <p className="mt-4 sm:text-lg">
            Explore a spectrum of features within Read Quill that empower your reading experience. From personalized
            reading targets to collaborative annotation tools, our platform offers a suite of capabilities tailored for
            avid readers.
          </p>
        </div>

        <div className="grid gap-4 mt-4 sm:grid-cols-2 xl:grid-cols-4 mb-6 z-20 relative">
          {HOME_FEATURES.map((feature, index) => (
            <HomeFeaturesCard key={`feature-${index}`} {...feature} />
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 z-20 relative">
          {HOME_MORE_FEATUES.map((feature, index) => (
            <HomeFeaturesMoreCard key={`feature-more-${index}`} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeFeatures;
