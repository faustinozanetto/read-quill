'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SignInIcon, buttonVariants, cn } from '@read-quill/design-system';

const HomeHero: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden" id="hero">
      <div aria-hidden="true" className="absolute inset-0 left-1/2 -translate-x-1/2 transform">
        <div className="rounded-fulls h-[40rem] w-[60rem] origin-top-left -translate-x-[15rem] -rotate-12 bg-gradient-to-tl from-primary via-primary/50 to-primary blur-3xl" />
      </div>
      <div className="mx-auto my-6 sm:my-12 max-w-[85rem] px-4 sm:px-6 md:my-24 lg:my-40 lg:px-8">
        <div className="relative z-10 grid gap-4 lg:grid-cols-2 lg:items-center md:gap-8 lg:gap-16">
          <div>
            <motion.h1
              className="leading-2 block text-4xl font-extrabold sm:text-5xl md:text-6xl text-center sm:max-w-full mx-auto sm:mx-0 sm:text-start lg:max-w-lg"
              initial={{ opacity: 0, translateY: -20 }}
              transition={{ delay: 0.15, duration: 0.35 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, translateY: 0 }}
            >
              <span className="hover:-translate-y-2 pointer-events-auto inline-block transition-transform duration-500">
                Elevate
              </span>{' '}
              Your{' '}
              <div className="inline-block relative ml-2">
                <svg
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 fill-primary w-[105%] h-12 sm:h-16"
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
                <span className="z-10 relative text-primary-foreground">Reading</span>
              </div>{' '}
              with Read Quill
            </motion.h1>
            <motion.p
              className="mt-3 md:text-lg max-w-xl text-center sm:text-start"
              initial={{ opacity: 0, translateY: -20 }}
              transition={{ delay: 0.25, duration: 0.35 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, translateY: 0 }}
            >
              Dive into enthralling books, seamlessly track your reading progress, and unlock personalized achievements.
              Immerse yourself in a world of stories crafted just for you
            </motion.p>

            <motion.div
              className="mt-4 grid w-full gap-2 md:inline-flex"
              initial={{ opacity: 0, translateX: -20 }}
              transition={{ delay: 0.25, duration: 0.35 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, translateX: 0 }}
            >
              <Link className={cn(buttonVariants({ className: 'w-full md:h-12' }))} href="#features" scroll>
                Learn More
              </Link>
              <Link
                className={cn(buttonVariants({ variant: 'outline', className: 'w-full md:h-12' }))}
                href="/auth/sign-in"
              >
                <SignInIcon className="mr-2" />
                Sign In for Free
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, translateX: 20 }}
            transition={{ delay: 0.35, duration: 0.35 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, translateX: 0 }}
          >
            <Image
              src="/images/home-hero.svg"
              alt="Home Hero Illustration"
              className="w-full rounded"
              title="Hero Picture"
              height={850}
              width={850}
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
