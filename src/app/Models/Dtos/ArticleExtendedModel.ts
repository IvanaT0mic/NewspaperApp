import { ArticleContentModel } from './ArticleContentModel';
import { ArticleModel } from './ArticleModel';
import { CommentModel } from './CommentModel';
import { ResourceModel } from './ResourceModel';
import { TagModel } from './TagModel';

export class ArticleExtendedModel extends ArticleModel {
  articleContent: Array<ArticleContentModel>;
  tags: Array<TagModel>;
  comments: Array<CommentModel>;
  resources: Array<ResourceModel>;
}
