export interface PostModel {
  title: string;
  content: string;
  slug: string;
}

export interface MarkdownPostModel {
  title: string;
  description?: string;
  headerImage?: string;
}
