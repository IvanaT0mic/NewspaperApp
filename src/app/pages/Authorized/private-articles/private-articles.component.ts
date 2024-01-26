import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, takeUntil } from 'rxjs';
import { CommonComponent } from 'src/app/Models/CommonComponent.component';
import { ArticleModel } from 'src/app/Models/Dtos/ArticleModel';
import { ArticleService } from 'src/app/services/article.service';
import { ConstRouteService } from 'src/app/services/const/const-route.service';

@Component({
  selector: 'app-private-articles',
  templateUrl: './private-articles.component.html',
  styleUrls: ['./private-articles.component.scss'],
})
export class PrivateArticlesComponent
  extends CommonComponent
  implements OnInit
{
  displayedColumns: string[] = [
    'id',
    'title',
    'numberOfComments',
    'numberOfTags',
    'numberOfResources',
    'createDate',
    'updateDate',
    'actions',
  ];
  dataSource: Array<ArticleModel> = new Array<ArticleModel>();

  articleForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
  });

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
        .getAllPrivateByUserId(id)
        .pipe(
          takeUntil(this.localNgUnsubscribe),
          map((x) => {
            this.dataSource = x;
          })
        )
        .subscribe();
    });
  }

  publicArticle(id: number): void {
    this.articleService.publishArticleById(id).subscribe(() => {
      location.reload();
    });
  }

  createArticle(): void {
    this.router.navigate([
      `${ConstRouteService.home}/${ConstRouteService.createArticle}`,
    ]);
  }

  editArticle(id: number): void {
    this.router.navigate([
      `${ConstRouteService.home}/${ConstRouteService.editArticle}/` + id,
    ]);
  }
}
