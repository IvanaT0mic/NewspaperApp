import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs';
import { CommonComponent } from 'src/app/Models/CommonComponent.component';
import { CreateTagModel } from 'src/app/Models/Dtos/CreateTagModel';
import { TagModel } from 'src/app/Models/Dtos/TagModel';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-tag-management',
  templateUrl: './tag-management.component.html',
  styleUrls: ['./tag-management.component.scss'],
})
export class TagManagementComponent extends CommonComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'actions'];
  dataSource: Array<TagModel> = new Array<TagModel>();

  tagForm: FormGroup = new FormGroup({
    titleOfNew: new FormControl('', [Validators.required]),
  });

  constructor(private tagService: TagService, public snackbar: MatSnackBar) {
    super();
  }

  ngOnInit() {
    this.tagService
      .getAllTags()
      .pipe(map((x) => (this.dataSource = x)))
      .subscribe();
  }

  deleteTag(id: number) {
    this.tagService.deleteTag(id).subscribe(() => {
      let pom = this.dataSource.filter((x) => x.id != id);
      this.dataSource = pom;
    });
  }

  createTag() {
    if (!this.tagForm.valid) {
      this.snackbar.open('no valid form', undefined, {
        duration: 3000,
      });
      return;
    }

    let newTag = new CreateTagModel();
    newTag.title = this.tagForm.get('titleOfNew').value;
    this.tagService.createTag(newTag).subscribe((x) => {
      let tag = new TagModel();
      tag.id = x;
      tag.title = this.tagForm.get('titleOfNew').value;

      this.dataSource.push(tag);
      this.dataSource = Object.assign([], this.dataSource);
    });
  }
}
