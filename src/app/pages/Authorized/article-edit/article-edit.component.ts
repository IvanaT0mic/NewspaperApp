import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, map, mergeMap, takeUntil } from 'rxjs';
import { CommonComponent } from 'src/app/Models/CommonComponent.component';
import { ArticleContentTypeEnum } from 'src/app/Models/Const/ArticleContentTypeEnum';
import { ArticleContentModel } from 'src/app/Models/Dtos/ArticleContentModel';
import { ArticleExtendedModel } from 'src/app/Models/Dtos/ArticleExtendedModel';
import { CreateArticleModel } from 'src/app/Models/Dtos/CreateArticleModel';
import { TagModel } from 'src/app/Models/Dtos/TagModel';
import { ResourceService } from 'src/app/services/Resource.service';
import { ArticleService } from 'src/app/services/article.service';
import { ConstRouteService } from 'src/app/services/const/const-route.service';
import { TagService } from 'src/app/services/tag.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss'],
})
export class ArticleEditComponent extends CommonComponent implements OnInit {
  spinner = true;

  articleForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    articleContentTextType: new FormControl(''),
  });

  cuurentArticle: ArticleExtendedModel;
  selectedTags: Array<number> = new Array<number>();
  articleContent: Array<ArticleContentModel> = new Array<ArticleContentModel>();
  tags: Array<TagModel> = new Array<TagModel>();

  constructor(
    private tagService: TagService,
    private resourceService: ResourceService,
    private articleService: ArticleService,
    private userService: UserService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    public snackbar: MatSnackBar
  ) {
    super();
  }

  ngOnInit() {
    this.activeRoute.params.subscribe((params) => {
      let id = params['id'];

      this.tagService
        .getAllTags()
        .pipe(
          mergeMap((x) => {
            this.tags = x;
            return this.articleService.getById(id).pipe(
              map((x) => {
                this.cuurentArticle = x;
                this.articleForm.controls['title'].setValue(
                  this.cuurentArticle.title
                );
                this.articleForm.controls['description'].setValue(
                  this.cuurentArticle.title
                );
                this.selectedTags = this.cuurentArticle.tags.map((x) => x.id);
                this.articleContent = JSON.parse(
                  JSON.stringify(this.cuurentArticle.articleContent)
                );
                return EMPTY;
              })
            );
          }),
          takeUntil(this.localNgUnsubscribe)
        )
        .subscribe(() => {
          this.spinner = false;
        });
    });
  }

  save(): void {
    if (!this.articleForm.valid) {
      this.snackbar.open('not valid form', undefined, {
        duration: 3000,
      });
      return;
    }

    let data = new CreateArticleModel();
    data.title = this.articleForm.get('title').value;
    data.description = this.articleForm.get('description').value;
    data.tagIds = this.selectedTags;
    data.articleContent = this.articleContent;
    data.status = 1;

    this.articleService
      .updateArticle(this.cuurentArticle.id, data)
      .pipe(takeUntil(this.localNgUnsubscribe))
      .subscribe(() => {
        this.router.navigate([
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
    this.articleForm.controls['articleContentTextType'].setValue('');
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
