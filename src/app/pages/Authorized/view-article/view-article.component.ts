import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { finalize, map, mergeMap, takeUntil } from 'rxjs';
import { CommonComponent } from 'src/app/Models/CommonComponent.component';
import { ArticleExtendedModel } from 'src/app/Models/Dtos/ArticleExtendedModel';
import { CommentModel } from 'src/app/Models/Dtos/CommentModel';
import { CreateComment } from 'src/app/Models/Dtos/CreateComment';
import { ResourceService } from 'src/app/services/Resource.service';
import { ArticleService } from 'src/app/services/article.service';
import { CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';
import { ArticleContentTypeEnum } from './../../../Models/Const/ArticleContentTypeEnum';

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.scss'],
})
export class ViewArticleComponent extends CommonComponent implements OnInit {
  article: ArticleExtendedModel;
  spinner: boolean = true;

  ArticleContentTypeEnum: ArticleContentTypeEnum;
  commentContent: string = '';

  comments: Array<CommentModel> = new Array();
  currentlyLoggedInUser = 0;

  constructor(
    private articleService: ArticleService,
    private resourceService: ResourceService,
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private commentService: CommentService,
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer
  ) {
    super();
  }

  ngOnInit() {
    this.currentlyLoggedInUser = this.userService.user.id;
    this.activeRoute.params.subscribe((params) => {
      let id = params['id'];

      this.articleService
        .getById(id)
        .pipe(
          takeUntil(this.localNgUnsubscribe),
          mergeMap((x) => {
            this.article = x;
            return this.commentService.getAllByArticleId(x.id).pipe(
              map((y) => {
                this.comments = y;
              })
            );
          }),
          finalize(() => (this.spinner = false))
        )
        .subscribe();
    });
  }

  getFile(id: number): void {
    this.resourceService
      .getByIdBlob(id)
      .pipe(takeUntil(this.localNgUnsubscribe))
      .subscribe((x) => {
        const blobUrl = URL.createObjectURL(x);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'downloaded-file.png'; // Change the file name accordingly
        link.click();
      });
  }

  deleteComment(id: number): void {
    this.commentService
      .deleteById(id)
      .pipe(takeUntil(this.localNgUnsubscribe))
      .subscribe(() => window.location.reload);
  }

  createComment(): void {
    if (!this.commentContent || this.commentContent == '') {
      this.snackBar.open('Invalid data for comment', undefined, {
        duration: 3000,
      });
    }

    let data = new CreateComment();
    data.articleId = this.article.id;
    data.content = this.commentContent;
    this.commentService
      .createComment(data)
      .pipe(takeUntil(this.localNgUnsubscribe))
      .subscribe(() => {
        this.commentContent = '';
        window.location.reload;
      });
  }
}
