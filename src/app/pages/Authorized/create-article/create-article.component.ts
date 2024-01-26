import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, takeUntil } from 'rxjs';
import { CommonComponent } from 'src/app/Models/CommonComponent.component';
import { ArticleContentTypeEnum } from 'src/app/Models/Const/ArticleContentTypeEnum';
import { ArticleContentModel } from 'src/app/Models/Dtos/ArticleContentModel';
import { CreateArticleModel } from 'src/app/Models/Dtos/CreateArticleModel';
import { TagModel } from 'src/app/Models/Dtos/TagModel';
import { ResourceService } from 'src/app/services/Resource.service';
import { ArticleService } from 'src/app/services/article.service';
import { ConstRouteService } from 'src/app/services/const/const-route.service';
import { TagService } from 'src/app/services/tag.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss'],
})
export class CreateArticleComponent extends CommonComponent implements OnInit {
  articleForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    articleContentTextType: new FormControl(''),
  });

  selectedTags: Array<number> = new Array<number>();
  articleContent: Array<ArticleContentModel> = new Array<ArticleContentModel>();
  fileName: string;

  tags: Array<TagModel> = new Array<TagModel>();

  constructor(
    private tagService: TagService,
    private resourceService: ResourceService,
    private articleService: ArticleService,
    private userService: UserService,
    private route: Router
  ) {
    super();
  }

  ngOnInit() {
    this.tagService
      .getAllTags()
      .pipe(
        takeUntil(this.localNgUnsubscribe),
        map((res) => {
          this.tags = res;
        })
      )
      .subscribe();
  }

  save(): void {
    if (!this.articleForm.valid) {
      //TODO
      console.log('form not valid');
      return;
    }

    let data = new CreateArticleModel();
    data.title = this.articleForm.get('title').value;
    data.description = this.articleForm.get('description').value;
    data.tagIds = this.selectedTags;
    data.articleContent = this.articleContent;

    this.articleService
      .createArtile(data)
      .pipe(takeUntil(this.localNgUnsubscribe))
      .subscribe(() => {
        this.route.navigate([
          `${ConstRouteService.home}/${ConstRouteService.myArticles}/` +
            this.userService.user.id,
        ]);
      });
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

  uploadImage(event) {
    const file: File = event.target.files[0];
    const formData = new FormData();
    formData.append('data', file);
    this.resourceService
      .uploadFile(formData)
      .pipe(takeUntil(this.localNgUnsubscribe))
      .subscribe((x) => {
        let content = new ArticleContentModel();
        content.resourceId = x;
        content.type = ArticleContentTypeEnum.RESOURCE;
        this.articleContent.push(content);
      });
  }
}
