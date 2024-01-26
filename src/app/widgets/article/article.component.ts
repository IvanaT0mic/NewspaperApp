import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleModel } from 'src/app/Models/Dtos/ArticleModel';
import { TagModel } from 'src/app/Models/Dtos/TagModel';
import { ArticleService } from 'src/app/services/article.service';
import { ConstRouteService } from 'src/app/services/const/const-route.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  @Input() article: ArticleModel;
  isAdmin: boolean = false;

  tags: Array<TagModel> = new Array<TagModel>();

  constructor(
    private route: Router,
    private userService: UserService,
    private articleService: ArticleService
  ) {}

  ngOnInit() {
    this.isAdmin = this.userService.isAdmin();
  }

  deleteArtice(id: number) {
    this.articleService.deleteById(id).subscribe(() => {
      location.reload();
    });
  }

  openArticle(id: number) {
    this.route.navigate([
      `${ConstRouteService.home}/${ConstRouteService.viewArticle}/` + id,
    ]);
  }
}
