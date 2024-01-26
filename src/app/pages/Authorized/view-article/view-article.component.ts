import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, map, takeUntil } from 'rxjs';
import { CommonComponent } from 'src/app/Models/CommonComponent.component';
import { ArticleExtendedModel } from 'src/app/Models/Dtos/ArticleExtendedModel';
import { ArticleService } from 'src/app/services/article.service';
import { ArticleContentTypeEnum } from './../../../Models/Const/ArticleContentTypeEnum';

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.scss'],
})
export class ViewArticleComponent extends CommonComponent implements OnInit {
  article: ArticleExtendedModel;
  spinner: boolean = true;

  ArticleContentTypeEnum: ArticleContentTypeEnum;

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    this.activeRoute.params.subscribe((params) => {
      let id = params['id'];

      this.articleService
        .getById(id)
        .pipe(
          takeUntil(this.localNgUnsubscribe),
          map((x) => {
            console.log(x);
            this.article = x;
            console.log(this.article.articleContent);
          }),
          finalize(() => (this.spinner = false))
        )
        .subscribe();
    });
  }
}
