import type { LandingFooterCategoryProps } from '../components/footer/landing-footer-category';

export const FOOTER_CATEGORIES: LandingFooterCategoryProps[] = [
  {
    title: 'Company',
    links: [
      {
        label: 'Terms',
        href: '/terms',
      },
      {
        label: 'Contact',
        href: '/contact',
      },
    ],
  },
];
