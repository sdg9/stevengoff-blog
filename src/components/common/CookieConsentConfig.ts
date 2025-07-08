import type { CookieConsentConfig } from 'vanilla-cookieconsent';

export const config: CookieConsentConfig = {
  guiOptions: {
    consentModal: {
      layout: 'box',
      position: 'bottom right',
      equalWeightButtons: true,
      flipButtons: false,
    },
    preferencesModal: {
      layout: 'box',
      position: 'right',
      equalWeightButtons: true,
      flipButtons: false,
    },
  },

  categories: {
    necessary: {
      readOnly: true,
    },
    functionality: {},
    analytics: {},
    performance: {},
    advertisement: {},
  },

  language: {
    default: 'en',
    autoDetect: 'browser',
    translations: {
      en: {
        consentModal: {
          title: "Hello traveller, it's cookie time!",
          description:
            'This website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will be set only after consent.',
          acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Reject all',
          showPreferencesBtn: 'Manage preferences',
          footer: '<a href="/privacy">Privacy Policy</a>\n<a href="/terms">Terms and conditions</a>',
        },
        preferencesModal: {
          title: 'Consent Preferences Center',
          acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Reject all',
          savePreferencesBtn: 'Save preferences',
          closeIconLabel: 'Close modal',
          serviceCounterLabel: 'Service|Services',
          sections: [
            {
              title: 'Cookie Usage 📢',
              description:
                'I use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in/out whenever you want. For more details relative to cookies and other sensitive data, please read the full <a href="/privacy" class="cc-link">privacy policy</a>.',
            },
            // {
            //   title: 'Strictly Necessary Cookies <span class="pm__badge">Always Enabled</span>',
            //   description:
            //     'These cookies are essential for the proper functioning of my website. Without these cookies, the website would not work properly',
            //   linkedCategory: 'necessary',
            // },
            // {
            //   title: 'Functionality Cookies',
            //   description: 'These cookies allow the website to provide personalized functionality.',
            //   linkedCategory: 'functionality',
            // },
            {
              title: 'Analytics Cookies',
              description:
                "These cookies help the website operator understand how its website performs, how visitors interact with the site, and whether there may be technical issues. This storage type usually doesn't collect information that identifies a visitor.",
              linkedCategory: 'analytics',
            },
            // {
            //   title: 'Performance and Functionality Cookies',
            //   description:
            //     'These cookies are used to enhance the performance and functionality of my website but are non-essential to their use. However, without these cookies, certain functionality (like videos) may become unavailable or you would be required to enter your login details every time you visit my website.',
            //   linkedCategory: 'performance',
            // },
            // {
            //   title: 'Targeting and Advertising Cookies',
            //   description:
            //     'These cookies collect information about how you use the website, which pages you visited and which links you clicked on. All of the data is anonymized and cannot be used to identify you',
            //   linkedCategory: 'advertisement',
            // },
            {
              title: 'More information',
              description:
                'For any query in relation to my policy on cookies and your choices, please <a class="cc-link" href="/contact">contact me</a>.',
            },
          ],
        },
      },
    },
  },
};
