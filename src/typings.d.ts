declare module 'prismic-reactjs' {
  export const RichText = {
    render
  }
}

declare module 'src/prismic' {
  type resolver = (doc: any) => string
  export const linkResolver: resolver
  export const linkResolverFactory: () => resolver
}

interface Window {
  disqus_ready: any
  DISQUS: any
}

interface CSSModule {
  [className: string]: string
}

// type shims for CSS modules

declare module '*.module.scss' {
  const cssModule: CSSModule
  export = cssModule
}

declare module '*.module.css' {
  const cssModule: CSSModule
  export = cssModule
}
