export interface NewsInterface {
  status: string;
  totalResults: number;
  articles: Articles[];
}

export interface Articles {
  source: Source;
  author: string | undefined;
  title: string | undefined;
  description: string | undefined;
  url: string;
  urlToImage: string | undefined;
  publishedAt: string | undefined;
  content: string | undefined;
} 
export interface Source {
  id: string | undefined;
  name: string  | undefined; 
}