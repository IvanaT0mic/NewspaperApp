import { ArticleContentModel } from './ArticleContentModel';

export class CreateArticleModel {
  title: string;
  description: string;
  status: number;
  articleContent: ArticleContentModel[];
  tagIds: number[];
}
