'use client';

import React from 'react';
import { motion } from 'framer-motion';

const HomeFeatures: React.FC = () => {
  return (
    <section className="w-full" id="stats">
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-10 md:px-20 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            className="font-display text-4xl font-extrabold sm:text-5xl"
            initial={{ opacity: 0, translateX: 20 }}
            transition={{ delay: 0.25, duration: 0.35 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, translateX: 0 }}
          >
            These are just <span className="text-primary">some</span>
            <br /> of our features
          </motion.h2>
          <p className="mt-4 sm:text-lg">
            Explore a spectrum of features within Read Quill that empower your reading experience. From personalized
            reading targets to collaborative annotation tools, our platform offers a suite of capabilities tailored for
            avid readers.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeFeatures;
