import { fileURLToPath } from 'node:url'
import { defineConfigWithTheme } from 'vitepress'
import { useSidebar } from 'vitepress-openapi'
import { examplesPages, testsPages } from '../pages'
import spec from '../public/openapi.json' with {type: 'json'}
import { sidebarExamplesConfigs } from '../sidebar-examples-configs'

const sidebar = useSidebar({
  spec,
})

const gaId = process.env.GA_ID || 'G-TEST'

export default defineConfigWithTheme({
  title: 'VitePress OpenAPI',
  description: 'Generate VitePress API Documentation from OpenAPI specs.',
  themeConfig: {
    nav: [
      {
        text: 'Showcase',
        link: '/showcase',
      },
      {
        text: 'Sandbox',
        link: '/sandbox',
      },
      {
        component: 'OALocaleSelect',
      },
    ],

    sidebar: {
      ...sidebarExamplesConfigs,
      '/': [
        {
          text: 'Getting Started',
          link: '/guide/getting-started',
        },
        {
          text: 'Pages',
          items: [
            {
              items: [
                {
                  text: 'By Operation',
                  link: '/pages/by-operation',
                },
                {
                  text: 'By Spec',
                  link: '/pages/by-spec',
                },
                {
                  text: 'By Tag',
                  link: '/pages/by-tag',
                },
                {
                  text: 'Introduction',
                  link: '/pages/introduction',
                },
              ],
            },
          ],
        },
        {
          text: 'Sidebar',
          items: [
            {
              items: [
                {
                  text: 'Sidebar Items',
                  link: '/sidebar/sidebar-items',
                },
                {
                  text: 'Sidebar Examples',
                  link: '/sidebar-examples/',
                  target: '_blank',
                },
              ],
            },
          ],
        },
        {
          text: 'Components',
          items: [
            {
              items: [
                {
                  text: 'Overview',
                  link: '/components/',
                },
                {
                  text: 'OASpec',
                  link: '/components/oa-spec',
                },
                {
                  text: 'OAOperation',
                  link: '/components/oa-operation',
                },
              ],
            },
          ],
        },
        {
          text: 'Composables',
          items: [
            {
              items: [
                {
                  text: 'useTheme',
                  link: '/composables/useTheme',
                },
                {
                  text: 'usePlayground',
                  link: '/composables/usePlayground',
                },
              ],
            },
          ],
        },
        {
          text: 'Customizations',
          items: [
            {
              items: [
                {
                  text: 'General',
                  items: [
                    {
                      items: [
                        {
                          text: 'i18n',
                          link: '/customizations/i18n',
                        },
                        {
                          text: 'Branding',
                          link: '/customizations/branding',
                        },
                      ],
                    },
                  ],
                },
                {
                  text: 'Operation',
                  items: [
                    {
                      items: [
                        {
                          text: 'Custom Slots',
                          link: '/customizations/custom-slots',
                        },
                        {
                          text: 'Operation Badges',
                          link: '/customizations/operation-badges',
                        },
                        {
                          text: 'Code Samples',
                          link: '/customizations/code-samples',
                        },
                        {
                          text: 'Operation tags slot',
                          link: '/customizations/operation-tags-slot',
                        },
                        {
                          text: 'Custom Server',
                          link: '/customizations/custom-server',
                        },
                        {
                          text: 'Operation Links',
                          link: '/customizations/operation-links',
                        },
                      ],
                    },
                  ],
                },
                {
                  text: 'Spec',
                  items: [
                    {
                      items: [
                        {
                          text: 'Multiple Specs',
                          link: '/customizations/multiple-specs',
                        },
                      ],
                    },
                  ],
                },
                {
                  text: 'Playground',
                  items: [
                    {
                      items: [
                        {
                          text: 'Examples',
                          link: '/customizations/playground-examples',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          text: 'Example',
          collapsed: true,
          items: [
            {
              text: 'Introduction',
              link: '/example/introduction',
            },
            ...sidebar.generateSidebarGroups({
              linkPrefix: '/example/operations/',
            }),
            {
              text: 'One Page',
              link: '/example/one-page',
            },
          ],
        },
        {
          text: 'Tests',
          collapsed: true,
          items: [
            ...testsPages.map(page => ({
              text: page.label,
              link: `/tests/${page.slug}`,
            })),
          ],
        },
        {
          text: 'Remote Examples',
          collapsed: true,
          items: [
            ...examplesPages.map(page => ({
              text: page.label,
              link: `/examples/${page.slug}`,
            })),
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/enzonotario/vitepress-openapi' },
    ],

    outline: {
      level: [1, 3],
    },

    footer: {
      message: 'Released under the <a href="https://github.com/enzonotario/vitepress-openapi/blob/main/LICENSE">MIT License</a>.',
      copyright: 'Copyright © 2023-present <a href="https://enzonotario.me">Enzo Notario</a>',
    },

    search: {
      provider: 'algolia',
      options: {
        appId: 'U57RORD73L',
        apiKey: '0f569871e30000cc3a091f2ebeb76dc5',
        indexName: 'vitepress-openapi',
      },
    },
  },
  head: [
    [
      'script',
      { async: '', src: `https://www.googletagmanager.com/gtag/js?id=${gaId}` },
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}');`,
    ],
  ],
  vite: {
    resolve: {
      alias: {
        ...(process.env.NODE_ENV === 'production'
          ? {
              '@docs': fileURLToPath(new URL('../', import.meta.url)),
              '@public': fileURLToPath(new URL('../public', import.meta.url)),
            }
          : {
              '@docs': fileURLToPath(new URL('../', import.meta.url)),
              '@public': fileURLToPath(new URL('../public', import.meta.url)),
              'vitepress-openapi/client': fileURLToPath(new URL('../../src/client', import.meta.url)),
              'vitepress-openapi/dist/style.css': fileURLToPath(new URL('../../src/theme', import.meta.url)),
              'vitepress-openapi': fileURLToPath(new URL('../../src/index', import.meta.url)),
            }),
      },
    },
  },
})
