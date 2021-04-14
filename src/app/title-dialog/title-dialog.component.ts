import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import * as dayjs from 'dayjs';
import { ClipboardService } from 'ngx-clipboard';
import { NutTitle } from '../definitions/nut';

@Component({
  selector: 'app-title-dialog',
  templateUrl: './title-dialog.component.html',
  styleUrls: ['./title-dialog.component.css'],
})
export class TitleDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public title: NutTitle,
    private clipboard: ClipboardService,
    private snack: MatSnackBar,
    private pageTitle: Title
  ) {}

  ngOnInit(): void {
    this.pageTitle.setTitle(this.title.name);
  }

  copyId(title: NutTitle): void {
    this.clipboard.copy(title.id);
    this.alert(`${title.id} copied to clipboard!`);
  }

  soon(): void {
    this.alert('Coming soon...');
  }

  alert(message: string): void {
    this.snack.open(message, 'Ok', {
      duration: 3000,
    });
  }

  getReleaseDate(): Date {
    return dayjs(this.title.releaseDate.toString(), 'YYYYMMDD').toDate();
  }
}
