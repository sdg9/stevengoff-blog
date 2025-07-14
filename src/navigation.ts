import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Homes',
      links: [
        {
          text: 'SaaS',
          href: getPermalink('/homes/saas'),
        },
        {
          text: 'Startup',
          href: getPermalink('/homes/startup'),
        },
        {
          text: 'Mobile App',
          href: getPermalink('/homes/mobile-app'),
        },
        {
          text: 'Personal',
          href: getPermalink('/homes/personal'),
        },
        {
          text: 'Counseling',
          href: getPermalink('/homes/counseling'),
        },
        {
          text: 'Beach Club',
          href: getPermalink('/homes/beach'),
        },
        {
          text: 'Physio 1',
          href: getPermalink('/homes/physio-home-1'),
        },
        {
          text: 'Physio 2',
          href: getPermalink('/homes/physio-home-2'),
        },
        {
          text: 'Physio 3',
          href: getPermalink('/homes/physio-home-3'),
        },
        {
          text: 'Alt Therapy',
          href: getPermalink('/homes/alternative-therapy'),
        },
        {
          text: 'Painter',
          href: getPermalink('/homes/painter'),
        },
        {
          text: 'Dog Grooming',
          href: getPermalink('/homes/doggrooming'),
        },
      ],
    },
    {
      text: 'Pages',
      links: [
        {
          text: 'Features (Anchor Link)',
          href: getPermalink('/#features'),
        },
        {
          text: 'Services',
          href: getPermalink('/services'),
        },
        {
          text: 'Pricing',
          href: getPermalink('/pricing'),
        },
        {
          text: 'About us',
          href: getPermalink('/about'),
        },
        {
          text: 'Contact',
          href: getPermalink('/contact'),
        },
        {
          text: 'Terms',
          href: getPermalink('/terms'),
        },
        {
          text: 'Privacy policy',
          href: getPermalink('/privacy'),
        },
      ],
    },
    {
      text: 'Landing',
      links: [
        {
          text: 'Lead Generation',
          href: getPermalink('/landing/lead-generation'),
        },
        {
          text: 'Long-form Sales',
          href: getPermalink('/landing/sales'),
        },
        {
          text: 'Click-Through',
          href: getPermalink('/landing/click-through'),
        },
        {
          text: 'Product Details (or Services)',
          href: getPermalink('/landing/product'),
        },
        {
          text: 'Coming Soon or Pre-Launch',
          href: getPermalink('/landing/pre-launch'),
        },
        {
          text: 'Subscription',
          href: getPermalink('/landing/subscription'),
        },
      ],
    },
    {
      text: 'Blog',
      links: [
        {
          text: 'Blog List',
          href: getBlogPermalink(),
        },
        {
          text: 'Article',
          href: getPermalink('get-started-website-with-astro-tailwind-css', 'post'),
        },
        {
          text: 'Article (with MDX)',
          href: getPermalink('markdown-elements-demo-post', 'post'),
        },
        {
          text: 'Category Page',
          href: getPermalink('tutorials', 'category'),
        },
        {
          text: 'Tag Page',
          href: getPermalink('astro', 'tag'),
        },
      ],
    },
    {
      text: 'Components',
      links: [
        {
          text: 'Components',
          href: getPermalink('components'),
        },
        {
          text: 'Icon List Demo',
          href: getPermalink('icon-list-demo'),
        },
        {
          text: 'Sub-Bullets Demo',
          href: getPermalink('sub-bullets-demo'),
        },
        {
          text: 'Therapy Example',
          href: getPermalink('therapy-example'),
        },
        {
          text: 'Beginner Session Example',
          href: getPermalink('beginner-session-example'),
        },
        {
          text: 'Color Palettes',
          href: getPermalink('color-palettes'),
        },
      ],
    },
    {
      text: 'Widgets',
      href: '#',
    },
  ],
  actions: [{ text: 'Download', href: 'https://github.com/onwidget/astrowind', target: '_blank' }],
};

export const footerData = {
  links: [
    {
      title: 'Contact Us',
      links: [{ text: 'hello@webtownhero.com', href: 'mailto:hello@webtownhero.com', icon: 'tabler:mail' }],
    },
    {
      title: 'Services',
      links: [
        { text: 'Website Design & Development', href: getPermalink('/services') },
        { text: 'SEO Optimization', href: getPermalink('/services') },
        { text: 'Website Maintenance', href: getPermalink('/services') },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About', href: getPermalink('/about') },
        { text: 'Contact', href: getPermalink('/contact') },
        { text: 'Privacy Policy', href: getPermalink('/privacy') },
        { text: 'Terms of Service', href: getPermalink('/terms') },
      ],
    },
    {
      title: 'Resources',
      links: [
        { text: 'FAQs', href: getPermalink('/contact#faq') },
        { text: 'Sitemap', href: '/sitemap-index.xml' },
      ],
    },
  ],
  secondaryLinks: [],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: 'https://x.com/webtownhero' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: 'https://www.instagram.com/webtownhero/' },
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: 'https://www.linkedin.com/company/webtownhero/' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: 'https://www.facebook.com/webtownhero' },
  ],
  footNote: ``,
  branding: {
    tagline: 'Crafting performant, professional websites for local businesses at an affordable monthly rate.',
  },
};
