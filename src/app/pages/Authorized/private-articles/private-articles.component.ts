import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { map, takeUntil } from 'rxjs';
import { CommonComponent } from 'src/app/Models/CommonComponent.component';
import { ArticleModel } from 'src/app/Models/Dtos/ArticleModel';
import { ArticleService } from 'src/app/services/article.service';
import { ConstRouteService } from 'src/app/services/const/const-route.service';
import { UserService } from 'src/app/services/user.service';

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
  myArticlesToList: boolean = false;

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    public snackbar: MatSnackBar,
    private userService: UserService
  ) {
    super();
  }

  ngOnInit() {
    this.activeRoute.params.subscribe((params) => {
      let id = params['id'];
      this.myArticlesToList = this.userService.user.id == id;

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
    this.snackbar.open('Publishing article ' + id, undefined, {
      duration: 3000,
    });
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

  deleteArticle(id: number): void {
    this.snackbar.open('Deleting article ' + id, undefined, {
      duration: 3000,
    });
    this.articleService
      .deleteById(id)
      .pipe(takeUntil(this.localNgUnsubscribe))
      .subscribe(() => {
        location.reload();
      });
  }

  viewArticle(id: number) {
    this.router.navigate([
      `${ConstRouteService.home}/${ConstRouteService.viewArticle}/` + id,
    ]);
  }
}
