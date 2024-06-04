'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@read-quill/design-system';

const HOME_FAQ_QUESTIONS: { title: string; content: string }[] = [
  {
    title: 'How do I get started with Read Quill?',
    content:
      'Getting started with Read Quill is easy! Simply sign up for an account, add your favourite books, and start tracking your reading journey.',
  },
  {
    title: 'How do I track my reading progress and set reading goals?',
    content:
      "Use Read Quill's intuitive interface to track pages read, set reading goals, and monitor your progress. Customize your reading targets based on your preferences.",
  },
  {
    title: 'Can I customize my reading goals on Read Quill?',
    content:
      'Absolutely! You can set personalized reading goals on Read Quill. Visit your profile settings to define goals such as daily page targets, weekly book quotas, and more. Achieve your reading milestones with ease.',
  },
  {
    title: 'What types of achievements can I unlock on Read Quill?',
    content:
      'Read Quill offers a variety of achievements based on your reading milestones. Achievements include reaching specific page counts, completing a certain number of books, and exploring different genres. Check your achievements page for a detailed overview.',
  },
  {
    title: 'How do book annotations work on Read Quill?',
    content:
      'Book annotations on Read Quill allow you to highlight and make notes while reading. Simply select a portion of text, choose Add Annotation, write your thoughts, and save. Annotations help you capture insights, discuss books, and create a personalized record of your reading experience, all accessible in your profile.',
  },
];

const HomeFaq: React.FC = () => {
  return (
    <section className="w-full" id="faq">
      <div className="bg-primary">
        <div className="mx-auto w-full max-w-5xl px-4 pt-10 md:px-20 md:pt-20 pb-10 text-primary-foreground">
          <motion.h2
            className="mb-4 text-start text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, translateY: -20 }}
            transition={{ delay: 0.15, duration: 0.35 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, translateY: 0 }}
          >
            Got Questions? We&apos;ve Got Answers!
          </motion.h2>

          <motion.p
            className="md:text-lg"
            initial={{ opacity: 0, translateX: -20 }}
            transition={{ delay: 0.25, duration: 0.35 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, translateX: 0 }}
          >
            Explore our frequently asked questions to find answers to common queries. If you can&apos;t find what
            you&apos;re looking for, feel free to reach out to us directly.
          </motion.p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-4 py-10 md:px-20">
        <Accordion className="space-y-4" type="single">
          {HOME_FAQ_QUESTIONS.map((question, index) => {
            const key = `faq-question-${index}`;
            return (
              <AccordionItem className="border bg-secondary/50 rounded-lg shadow" key={key} value={key}>
                <AccordionTrigger className="text-base text-start p-4 hover:no-underline">
                  <span className="mr-auto">{question.title}</span>
                </AccordionTrigger>
                <AccordionContent className="text-base ml-4">{question.content}</AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
};

export default HomeFaq;
