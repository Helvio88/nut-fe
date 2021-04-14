import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { NutGame, NutTitle } from './definitions/nut';
import { NutService } from './services/nut.service';
import { TitleDialogComponent } from './title-dialog/title-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private nut: NutService,
    private snack: MatSnackBar,
    public dialog: MatDialog,
    private pageTitle: Title
  ) {}
  title = 'Nut';
  titles: NutTitle[] = [];
  downloadedTitles: NutTitle[] = [];
  notDownloadedTitles: NutTitle[] = [];
  search: NutGame[] = [];
  downloadedIds: string[] = [];

  cols = 12;

  window = window;

  id: string | null = '';

  async ngOnInit(): Promise<void> {
    this.resetTitle();
    // Search all Downloaded titles and create a list of IDs
    this.search = await this.nut.search();
    this.search.forEach((key) => this.downloadedIds.push(key.id));

    // Get a list of all existing titles
    this.titles = await this.nut.titles();

    // List of Downloaded Titles
    this.downloadedTitles = this.titles.filter(
      (title) =>
        !title.isDLC &&
        !title.isDemo &&
        !title.isUpdate &&
        this.downloadedIds.includes(title.id)
    );

    // List of Not Downloaded Titles
    this.notDownloadedTitles = this.titles.filter(
      (title) =>
        !title.isDLC &&
        !title.isDemo &&
        !title.isUpdate &&
        !this.downloadedIds.includes(title.id)
    );
  }

  titleDialog(title: NutTitle): void {
    this.dialog
      .open(TitleDialogComponent, {
        data: title,
      })
      .afterClosed()
      .toPromise()
      .finally(() => this.resetTitle());
  }

  // Material.io recommended breakpoints
  // https://material.io/design/layout/responsive-layout-grid.html#breakpoints
  setCols(): void {
    this.cols = window.innerWidth < 600 ? 4 : window.innerWidth < 840 ? 8 : 14;
  }

  // Minimum columns mathching maximum col/row span
  getGridSpan(title: NutTitle): number {
    return title.rank < 20 ? 4 : title.rank < 50 ? 2 : 1;
  }

  getIcon(title: NutTitle): string {
    if (environment.production) {
      return `/api/titleImage/${title.id}/${this.getGridSpan(title) * 200}`;
    }
    return title.iconUrl;
  }

  getBanner(title: NutTitle): string {
    if (environment.production) {
      return `/api/bannerImage/${title.id}`;
    }
    return title.bannerUrl;
  }

  getScreenshot(title: NutTitle, index: number): string {
    if (environment.production) {
      return `/api/screenshotImage/${title.id}/${index}`;
    }
    return title.screenshots[index];
  }

  // General Purpose Status Messages
  alert(message: string): void {
    this.snack.open(message, 'Ok', {
      duration: 3000,
    });
  }

  // Page title reset
  resetTitle(): void {
    this.pageTitle.setTitle('Nut - Your Nintendo Switch Library');
  }
}
