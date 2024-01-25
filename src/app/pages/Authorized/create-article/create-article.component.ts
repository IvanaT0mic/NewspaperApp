import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { ArticleContentTypeEnum } from 'src/app/Models/Const/ArticleContentTypeEnum';
import { ArticleContentModel } from 'src/app/Models/Dtos/ArticleContentModel';
import { TagModel } from 'src/app/Models/Dtos/TagModel';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss'],
})
export class CreateArticleComponent implements OnInit {
  articleForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    articleContentTextType: new FormControl(''),
  });

  selectedTags: Array<number> = new Array<number>();
  articleContent: Array<ArticleContentModel> = new Array<ArticleContentModel>();

  tags: Array<TagModel> = new Array<TagModel>();

  constructor(private tagService: TagService) {}

  ngOnInit() {
    this.tagService
      .getAllTags()
      .pipe(
        map((res) => {
          this.tags = res;
        })
      )
      .subscribe();
  }

  save(): void {
    console.log(this.articleForm.value);
  }

  onTagChange(tagId: number, isChecked: boolean) {
    if (isChecked) {
      this.selectedTags.push(tagId);
    } else {
      const index = this.selectedTags.indexOf(tagId);
      if (index !== -1) {
        this.selectedTags.splice(index, 1);
      }
    }
  }

  addTextTypeContent() {
    let content = new ArticleContentModel();
    content.type = ArticleContentTypeEnum.TEXT;
    content.text = this.articleForm.get('articleContentTextType').value;

    this.articleContent.push(content);
  }
}
