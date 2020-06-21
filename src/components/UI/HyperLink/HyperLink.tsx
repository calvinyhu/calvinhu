import React, { FC } from 'react';

interface HyperLinkProps {
  className?: string;
  href: string;
}

const HyperLink: FC<HyperLinkProps> = ({ className, href, children }) => {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

export default HyperLink;
