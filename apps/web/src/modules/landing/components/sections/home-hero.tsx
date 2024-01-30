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
        <div className="rounded-fulls h-[40rem] w-[60rem] origin-top-left -translate-x-[15rem] -rotate-12 bg-gradient-to-tl from-orange-300 via-yellow-100 to-orange-200 blur-3xl dark:from-orange-500/50 dark:via-yellow-600/50 dark:to-orange-400/40 " />
      </div>
      <div className="mx-auto my-6 max-w-[85rem] px-4 sm:px-6 md:my-14 lg:my-20 lg:px-8">
        <div className="relative z-10 grid gap-4 lg:grid-cols-2 lg:items-center md:gap-8 lg:gap-16">
          <div>
            <motion.h1
              className="leading-2 block text-4xl font-extrabold sm:text-5xl md:text-6xl"
              initial={{ opacity: 0, translateY: -20 }}
              transition={{ delay: 0.15, duration: 0.35 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, translateY: 0 }}
            >
              <span className="hover:-translate-y-2 pointer-events-auto inline-block transition-transform duration-500">
                Elevate
              </span>{' '}
              Your <span className="text-primary underline decoration-8">Reading</span> with <br /> Read Quill
            </motion.h1>
            <motion.p
              className="mt-3 md:text-lg max-w-xl"
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
              <Link className={cn(buttonVariants({ className: 'w-full md:h-12' }))} href="/">
                Learn More
              </Link>
              <Link className={cn(buttonVariants({ variant: 'outline', className: 'w-full md:h-12' }))} href="/sign-in">
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
              alt="Home Hero Illustration"
              className="w-full rounded"
              height={1500}
              priority
              src="/images/home-hero-background.png"
              title="Hero Picture"
              width={1500}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
