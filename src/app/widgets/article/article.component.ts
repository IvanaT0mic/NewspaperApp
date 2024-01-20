import { Component, Input, OnInit } from '@angular/core';
import { ArticleModel } from 'src/app/Models/Dtos/ArticleModel';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  @Input() article: ArticleModel;

  constructor() {}

  ngOnInit() {}

  editArticle() {}

  openArticle() {}
}
