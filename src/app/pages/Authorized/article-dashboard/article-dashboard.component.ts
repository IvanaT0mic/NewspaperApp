import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EMPTY, catchError, takeUntil } from 'rxjs';
import { CommonComponent } from 'src/app/Models/CommonComponent.component';
import { ArticleModel } from 'src/app/Models/Dtos/ArticleModel';
import { ConstRouteService } from 'src/app/services/const/const-route.service';
import { ArticleService } from './../../../services/article.service';

@Component({
  selector: 'app-article-dashboard',
  templateUrl: './article-dashboard.component.html',
  styleUrls: ['./article-dashboard.component.scss'],
})
export class ArticleDashboardComponent
  extends CommonComponent
  implements OnInit
{
  articles: Array<ArticleModel> = new Array<ArticleModel>();

  constructor(
    private articleService: ArticleService,
    private router: Router,
    public snackbar: MatSnackBar
  ) {
    super();
  }

  ngOnInit() {
    this.articleService
      .getAllPublishedArticles()
      .pipe(
        takeUntil(this.localNgUnsubscribe),
        catchError(() => {
          this.snackbar.open('no published notes', undefined, {
            duration: 3000,
          });
          return EMPTY;
        })
      )
      .subscribe((res) => {
        this.articles = res;
      });
  }

  navigateToContactUser(): void {
    this.router.navigate([`${ConstRouteService.contactAdmin}`]);
  }
}
