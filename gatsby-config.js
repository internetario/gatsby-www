'use strict'
const { linkResolverFactory } = require('./src/prismic')

module.exports = {
  siteMetadata: {
    title: 'Internetario | Valorizar através de tecnologia',
    description:
      'O maior triunfo é construir a ponte entre seu negócio e a tecnologia. Sem firulas. A solução certa é a que leva ao sucesso o quanto antes, de forma sustentável e escalável.',
    siteUrl: 'https://internetario.ga',
    author: {
      name: 'Tiago Miranda',
      url: 'https://twitter.com/tiagosemoh',
      email: 'tgcvmr@gmail.com'
    }
  },
  plugins: [
    // 37bits: custom
    `gatsby-plugin-sass`,
    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: 'irio',
        accessToken:
          'MC5YRVRIVlJFQUFDRUFPbEk5.Z--_vWE077-977-9fe-_vQRI77-9CO-_vWrvv73vv73vv73vv73vv73vv73vv71k77-9aVPvv71w77-977-9LVbvv70',
        lang: '*',
        linkResolver: linkResolverFactory()
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-133163351-1'
      }
    },
    // https://www.gatsbyjs.org/packages/gatsby-plugin-google-tagmanager/
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `7bits`,
        short_name: `7bits`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `minimal-ui`,
        icon: `src/content/media/favicons/bold.png`
      }
    },
    `gatsby-plugin-sitemap`,

    // Scaffold
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content`
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1rem'
            }
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1140,
              quality: 90,
              linkImagesToOriginal: false
            }
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Cutive+Mono', 'Montserrat:300,400,500']
        }
      }
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://gatsby-starter-typescript-plus.netlify.com'
      }
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-typescript',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet'
  ]
}
