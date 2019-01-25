export interface HtmlText {
  html: string
  text: string
}

export type FluidImage = any

export interface BaseEntity {
  uid: string
  first_publication_date: string
  last_publication_date: string
  lang: string
  data: {
    link: string
    title: {
      text: string
    }
    subtitle: {
      text: string
    }
    cover_picture: {
      url?: string
      alt?: string
      localFile?: {
        childImageSharp: {
          fluid: FluidImage
        }
      }
    }
  }
}

export interface DynamicContent {
  background_color: string
  text_color: string
  content: { html: string; [prop: string]: any }
}

export interface ProjectTile extends BaseEntity {}
export interface PostTile extends BaseEntity {}

interface ArticleData extends BaseEntity {
  link: string
  author: string
  meta_description: string
  article_section: string
  title: HtmlText
  subtitle: HtmlText
  tags: { tag: string }[]
  content: DynamicContent[]
  cover_picture: {
    localFile: {
      childImageSharp: {
        fixed: { src: string }
        fluid: FluidImage
      }
    }
  }
}

interface Article extends BaseEntity {
  dataString: string
  data: ArticleData
}

interface PostData extends ArticleData {
  body: {
    slice_type: string
    primary: {
      title: HtmlText
      content: HtmlText
      link: { type: string; slug: string }
      label: string
      background_color: string
      text_color: string
    }
  }[]
}

export interface Post extends Article {
  first_publication_date: string
  last_publication_date: string
  data: PostData
}

export interface Project extends Article {
  first_publication_date: string
  last_publication_date: string
  data: PostData
}

export type Blog = {
  node: PostTile
}[]

export type Portfolio = {
  node: ProjectTile
}[]

export interface Process {
  id: string
  lang: string
  data: {
    title: HtmlText
    subtitle: HtmlText
    plans_action_label: string
    service: {
      title: HtmlText
      content: HtmlText
      service_icon: {
        alt: string
        copyright: string
        url: string
      }
    }[]
  }
}

export const FilterLanguage = <T extends BaseEntity>(
  target_lang: string,
  map: { node: T }[]
): { node: T }[] => {
  type tmp_node_map = { [link: string]: { node: T } }
  const agg: tmp_node_map = map.reduce(
    (result: tmp_node_map, edge) => {
      const entity_link = edge.node.data.link

      if (!result[entity_link]) result[entity_link] = edge

      const current_entity_lang = result[entity_link].node.lang
      const is_selected_lang = current_entity_lang.indexOf(target_lang) >= 0

      if (!is_selected_lang) result[entity_link] = edge

      return result
    },
    {} as tmp_node_map
  )
  const list = Object.keys(agg).map((k: string) => agg[k])
  return list // .filter(v => v !== false) as { node: T }[]
}
