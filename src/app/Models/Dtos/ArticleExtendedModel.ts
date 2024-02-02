import { ArticleContentModel } from './ArticleContentModel';
import { ArticleModel } from './ArticleModel';
import { ResourceModel } from './ResourceModel';
import { TagModel } from './TagModel';

export class ArticleExtendedModel extends ArticleModel {
  articleContent: Array<ArticleContentModel>;
  tags: Array<TagModel>;
  resources: Array<ResourceModel>;
}
