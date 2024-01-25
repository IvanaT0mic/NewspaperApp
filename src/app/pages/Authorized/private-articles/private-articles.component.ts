import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ArticleModel } from 'src/app/Models/Dtos/ArticleModel';
import { ArticleService } from 'src/app/services/article.service';
import { ConstRouteService } from 'src/app/services/const/const-route.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-private-articles',
  templateUrl: './private-articles.component.html',
  styleUrls: ['./private-articles.component.scss'],
})
export class PrivateArticlesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'createDate', 'actions'];
  dataSource: Array<ArticleModel> = new Array<ArticleModel>();

  articleForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
  });

  constructor(
    private articleService: ArticleService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    let id = this.userService.user.id;
    this.articleService
      .getAllPrivateByUserId(id)
      .pipe(
        map((x) => {
          this.dataSource = x;
        })
      )
      .subscribe();
  }

  publicArticle(id: number): void {
    this.articleService.publishArticleById(id).subscribe();
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
