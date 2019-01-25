'use strict'

const path = require('path')
const chunk = require('lodash/chunk')

const createEntityPage = createPage => (dir, template, node) => {
  try {
    if (dir && node.data.link)
      createPage({
        path: dir + node.uid,
        component: template,
        context: {
          lang: node.lang,
          link: node.data.link,
          uid: node.uid
        }
      })
  } catch (err) {
    console.error(err)
  }
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        src: path.resolve(__dirname, 'src/')
      }
    }
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField, createPage } = actions
  const entityPage = createEntityPage(createPage)

  switch (node.internal.type) {
    case 'MarkdownRemark':
      {
        const { permalink, layout } = node.frontmatter
        const { relativePath } = getNode(node.parent)

        let slug = permalink

        if (!slug) {
          slug = `/${relativePath.replace('.md', '')}/`
        }

        // Used to generate URL to view this content.
        createNodeField({
          node,
          name: 'slug',
          value: slug || ''
        })

        // Used to determine a page layout.
        createNodeField({
          node,
          name: 'layout',
          value: layout || ''
        })
      }
      break

    // case 'PrismicProject':
    //   entityPage('/project/', path.resolve(`./src/templates/project.tsx`), node)
    //   break

    // case 'PrismicBlogPost':
    //   entityPage('/post/', path.resolve(`./src/templates/post.tsx`), node)
    //   break
  }
}

const assertQuery = response => {
  if (response.errors) {
    console.error(response.errors)
    throw new Error(response.errors)
  }
  return response
}

const setupPrismicPage = (graphql, createPage) => async (dir, template, query) => {
  try {
    const result = assertQuery(await graphql(query))
    const length = result.data.entities.distinct.length
    const page_length = result.data.env.siteMetadata.ui.pagination_size

    chunk(new Array(length).fill(0), page_length).forEach((_, index) => {
      const route = `/${dir}/${index}`
      createPage({
        path: route,
        component: template,
        context: { page_index: index, type: dir }
      })
    })
  } catch (err) {
    console.error(err)
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions
  const prismicPages = setupPrismicPage(graphql, createPage)

  {
    const query = assertQuery(
      await graphql(`
        {
          allMarkdownRemark(limit: 1000) {
            edges {
              node {
                fields {
                  layout
                  slug
                }
              }
            }
          }
        }
      `)
    )

    query.data.allMarkdownRemark.edges.forEach(({ node }) => {
      const { slug, layout } = node.fields
      createPage({
        path: slug,
        component: path.resolve(`./src/templates/${layout || 'page'}.tsx`),
        context: { slug }
      })
    })
  }

  // prismicPages(
  //   'portfolio',
  //   path.resolve(`./src/pages/portfolio.tsx`),
  //   `{
  //     entities: allPrismicProject {
  //       distinct(field: data___link)
  //     }
  //     env: site {
  //       siteMetadata {
  //         ui {
  //           pagination_size
  //         }
  //       }
  //     }
  //   }`
  // )

  // prismicPages(
  //   'blog',
  //   path.resolve(`./src/pages/blog.tsx`),
  //   `{
  //     entities: allPrismicBlogPost {
  //       distinct(field: data___link)
  //     }
  //     env: site {
  //       siteMetadata {
  //         ui {
  //           pagination_size
  //         }
  //       }
  //     }
  //   }`
  // )
}
