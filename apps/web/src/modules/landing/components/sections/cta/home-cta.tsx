'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookIcon, Button } from '@read-quill/design-system';
import Link from 'next/link';

const HomeCta: React.FC = () => {
  return (
    <section className="w-full" id="cta">
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-10 md:px-20 md:py-24 flex flex-col gap-2 md:gap-4 md:flex-row items-center md:justify-between">
        <div>
          <motion.h2
            className="mb-4 text-start text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, translateY: -20 }}
            transition={{ delay: 0.15, duration: 0.35 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, translateY: 0 }}
          >
            Start Your Reading <br /> Journey
            <div className="inline-block relative ml-2">
              <svg
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 fill-primary w-[105%]"
                preserveAspectRatio="none"
                viewBox="0 0 193 69"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M192.685 60.0581C189.638 63.2174 186.624 63.5183 183.704 64.1419C178.93 65.1625 174.124 65.2311 169.342 66.0772C153.84 68.8354 117.378 69.0717 101.874 67.6253C87.1169 66.2517 72.353 66.8272 57.6123 65.4893C44.6382 64.3122 31.6257 67.4624 18.7086 63.8732C14.4352 62.6864 10.1815 62.5325 5.91258 62.104C2.89848 61.8045 1.34943 15.9688 0.789679 9.47172C0.287422 3.65592 1.58224 -0.128342 4.04561 0.195827C19.2719 2.21776 34.4976 0.986949 49.7227 3.0565C59.061 4.33257 68.4077 3.01528 77.7431 3.65949C87.2009 4.31195 96.6344 6.58801 106.104 6.68965C121.249 6.85174 157.322 7.03029 172.465 6.98496C174.978 6.98496 185.498 6.08252 187.998 5.27622C192.891 3.7007 189.206 48.4815 192.685 60.0581Z"
                  fillRule="evenodd"
                />
              </svg>
              <span className="z-10 relative text-primary-foreground">Today!</span>
            </div>
          </motion.h2>

          <motion.p
            className="md:text-lg md:max-w-2xl xl:max-w-3xl"
            initial={{ opacity: 0, translateX: -20 }}
            transition={{ delay: 0.25, duration: 0.35 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, translateX: 0 }}
          >
            Join Read Quill and embark on an immersive reading experience. Unleash the power of knowledge, explore
            captivating stories, and connect with a community of fellow readers. Sign up now and dive into a world of
            endless possibilities.
          </motion.p>
        </div>

        <Button asChild className="w-full md:w-1/4">
          <Link href="/sign-in">
            <BookIcon className="mr-2" />
            Join Now
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default HomeCta;
