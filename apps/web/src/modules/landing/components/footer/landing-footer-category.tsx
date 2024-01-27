import React from 'react';
import type { LandingFooterLinkProps } from './landing-footer-link';
import FooterLink from './landing-footer-link';

export interface LandingFooterCategoryProps {
  title: string;
  links: LandingFooterLinkProps[];
}

const LandingFooterCategory: React.FC<LandingFooterCategoryProps> = (props) => {
  const { title, links } = props;

  return (
    <div>
      <span className="text-lg font-semibold">{title}</span>
      <ul className="mt-3 grid space-y-2 text-sm">
        {links.map((link) => {
          return <FooterLink key={link.label} {...link} />;
        })}
      </ul>
    </div>
  );
};
export default LandingFooterCategory;
