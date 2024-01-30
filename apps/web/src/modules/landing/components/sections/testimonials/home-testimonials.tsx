'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@read-quill/design-system/src';
import HomeTestimonialCard from './home-testimonial-card';

const HOME_TESTIMONIALS: React.ComponentPropsWithoutRef<typeof HomeTestimonialCard>[] = [
  {
    name: 'Emily Thompson',
    content:
      'Read Quill opened up a world of literary wonders for me. The immersive stories and vibrant community have transformed my reading experience.',
  },
  {
    name: 'Javier Rodriguez',
    content:
      "As an avid reader, Read Quill has become my sanctuary for exploring new genres and connecting with fellow book enthusiasts. It's more than a platform; it's a literary adventure.",
  },
  {
    name: 'Olivia Chen',
    content:
      "Read Quill is not just a reading platform; it's a haven for book lovers. The recommendations, discussions, and diverse stories have enriched my reading journey in ways I never imagined.",
  },
  {
    name: 'Aiden Harris',
    content:
      'Being a part of Read Quill feels like joining a global book club. The shared passion for literature and the quality recommendations have introduced me to hidden gems and new perspectives.',
  },
  {
    name: 'Isabella Patel',
    content:
      'Read Quill has redefined how I experience books. The engaging discussions, personalized recommendations, and the sense of community make it an essential part of my reading routine.',
  },
  {
    name: 'Michael Rodriguez',
    content:
      'As an avid reader, Read Quill has become an essential tool for tracking my reading progress and discovering books I might have missed. Highly recommended!',
  },
];

const chunkArray = <T,>(arr: T[], chunkSize: number): T[][] => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize));
  }
  return chunks;
};

const HomeTestimonials: React.FC = () => {
  const chunks = chunkArray(HOME_TESTIMONIALS, Math.ceil(HOME_TESTIMONIALS.length / 2));

  return (
    <section className="w-full bg-primary" id="testimonials">
      <div className="mx-auto w-full max-w-screen-2xl py-10 md:px-20 md:py-24 relative">
        <div className="relative mx-auto max-w-2xl px-4 text-center z-20 mb-6">
          <motion.h2
            className="font-display text-4xl font-extrabold sm:text-5xl"
            initial={{ opacity: 0, translateX: 20 }}
            transition={{ delay: 0.25, duration: 0.35 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, translateX: 0 }}
          >
            Loved by Readers
          </motion.h2>
          <p className="mt-4 md:text-lg">
            Hear what our community has to say about their transformative journey with Read Quill. Our readers share
            their experiences and how Read Quill has become an integral part of their reading adventures.
          </p>
        </div>

        <div className="relative overflow-hidden max-w-screen-xl mx-auto before:absolute before:top-0 before:left-0 before:h-full before:w-full before:z-[1] before:bg-gradient-to-r before:from-primary before:via-transparent before:to-primary flex-col gap-4 flex items-center before:pointer-events-none testimonials-items">
          {chunks.map((chunk, index) => (
            <div
              className={cn('w-max flex space-x-6 animate-home-testimonials-1', index % 2 !== 0 && 'direction-reverse')}
              key={`testimonial-chunk-${index}`}
            >
              {chunk.map((testimonial) => (
                <HomeTestimonialCard key={`testimonial-${testimonial.name}`} {...testimonial} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeTestimonials;
