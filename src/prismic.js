const document_type_routes = {
  about_coffective_process: () => 'process',
  blog_post: doc => `post/${doc}`,
  project: doc => `project/${doc}`
}

const linkResolver = doc => {
  const { type, uid } = doc
  const dir = document_type_routes[type]
  if (dir) {
    const path = `/${dir(uid)}`
    return path
  }
  return uid
}
exports.linkResolver = linkResolver

const linkResolverFactory = () => {
  return (/*{ node, key, value }*/) => linkResolver
}
exports.linkResolverFactory = linkResolverFactory
