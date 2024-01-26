import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleModel } from 'src/app/Models/Dtos/ArticleModel';
import { TagModel } from 'src/app/Models/Dtos/TagModel';
import { ConstRouteService } from 'src/app/services/const/const-route.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  @Input() article: ArticleModel;

  tags: Array<TagModel> = new Array<TagModel>();

  constructor(private route: Router) {}

  ngOnInit() {}

  editArticle() {}

  openArticle(id: number) {
    this.route.navigate([
      `${ConstRouteService.home}/${ConstRouteService.viewArticle}/` + id,
    ]);
  }
}
