import { getPermalink, getBlogPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Home',
      href: getPermalink('/'),
    },
    {
      text: 'Blog',
      href: getBlogPermalink(),
    },
    {
      text: 'Timeline',
      href: getPermalink('/timeline'),
    },
    {
      text: 'About',
      href: getPermalink('/about'),
    },
  ],
};

export const footerData = {
  links: [
    {
      title: 'Pages',
      links: [
        { text: 'Home', href: getPermalink('/') },
        { text: 'Blog', href: getBlogPermalink() },
        { text: 'Timeline', href: getPermalink('/timeline') },
        { text: 'About', href: getPermalink('/about') },
        { text: 'Privacy', href: getPermalink('/privacy') },
      ],
    },
  ],
  socialLinks: [{ ariaLabel: 'GitHub', icon: 'tabler:brand-github', href: 'https://github.com/sdg9' }],
  footNote: `Made with Astro. Programming is digital Legos.`,
};
