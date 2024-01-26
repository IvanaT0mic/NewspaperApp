import { Component, OnInit } from '@angular/core';
import { CommonComponent } from 'src/app/Models/CommonComponent.component';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss'],
})
export class ArticleEditComponent extends CommonComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}
}
