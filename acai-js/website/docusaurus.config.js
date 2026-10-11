module.exports = {
  title: 'Acai JS SDK Docs',
  tagline: 'Acai JavaScript SDK',
  url: 'https://clickstream.acaiplatform.ai',
  baseUrl: '/Acai-JavaScript/',
  onBrokenLinks: 'throw',
  favicon: 'img/amp_favicon.ico',
  organizationName: 'Acai',
  projectName: 'Acai-JavaScript',
  themeConfig: {
    navbar: {
      logo: {
        alt: 'Acai Logo',
        src: 'img/amp_logo.svg',
      },
      hideOnScroll: true,
      items: [
        {
          href: 'https://clickstream.acaiplatform.ai',
          label: 'GitHub',
          position: 'left',
        },
      ],
    },
    footer: {
      logo: {
        alt: 'Acai Logo',
        src: 'img/amp_logo.svg',
      },
      copyright: `Copyright © ${new Date().getFullYear()} Acai, Inc.`,
    },
    prism: {
      defaultLanguage: 'javascript',
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'docs',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://clickstream.acaiplatform.ai',
          sidebarCollapsible: false,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
