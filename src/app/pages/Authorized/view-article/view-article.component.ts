import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { finalize, map, takeUntil } from 'rxjs';
import { CommonComponent } from 'src/app/Models/CommonComponent.component';
import { ArticleExtendedModel } from 'src/app/Models/Dtos/ArticleExtendedModel';
import { ResourceService } from 'src/app/services/Resource.service';
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
    private resourceService: ResourceService,
    private activeRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
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

  getFile(id: number): void {
    this.resourceService
      .getByIdBlob(id)
      .pipe(takeUntil(this.localNgUnsubscribe))
      .subscribe((x) => {
        const blobUrl = URL.createObjectURL(x);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'downloaded-file.png'; // Change the file name accordingly
        link.click();
      });
  }
}
