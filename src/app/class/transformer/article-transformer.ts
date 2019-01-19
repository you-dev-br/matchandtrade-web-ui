import { Article } from '../pojo/article';
import { Transformer } from './transformer';
import { HttpResponse } from '@angular/common/http';

export class ArticleTransformer extends Transformer<Article>{
  toPojo(pojoObject: any): Article {
    let pojo = pojoObject;
    if (pojoObject instanceof HttpResponse) {
      pojo = pojoObject.body;
    }
    const result = new Article();
    result.links = this.buildLinks(pojo._links);
    result.description = pojo.description;
    result.name = pojo.name;
    result.articleId = pojo.articleId;
    return result;
  }
}
