import { Organization, WithContext } from 'schema-dts';

export const CORE_RICH_RESULTS: WithContext<Organization> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Read Quill',
  url: 'https://readquill.com',
  logo: '/favicons/android-chrome-512x512.png',
  description:
    'ReadQuill is your all-in-one reading companion, providing a personalized space to track, review, and explore your literary adventures.',
};
