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
  search: NutGame[] = [];
  downloadedIds: string[] = [];

  downloadedTitles: NutTitle[] = [];
  notDownloadedTitles: NutTitle[] = [];

  downloadedDLCs: NutTitle[] = [];
  notDownloadedDLCs: NutTitle[] = [];

  downloadedUpdates: NutTitle[] = [];
  notDownloadedUpdates: NutTitle[] = [];

  rankedDownloadedTitles: NutTitle[] = [];

  cols = 12;

  window = window;

  id: string | null = '';

  async ngOnInit(): Promise<void> {
    // Set Page Title
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

    // Sort owned titles by Name
    this.downloadedTitles.sort((t1, t2) => t1.name.localeCompare(t2.name));

    // List of Downloaded Titles for Ranking
    this.rankedDownloadedTitles = this.titles.filter(
      (title) =>
        !title.isDLC &&
        !title.isDemo &&
        !title.isUpdate &&
        this.downloadedIds.includes(title.id)
    );

    // Sort titles by Rank
    this.rankedDownloadedTitles.sort((title) => title.rank);

    // List of Not Downloaded Titles
    this.notDownloadedTitles = this.titles.filter(
      (title) =>
        !title.isDLC &&
        !title.isDemo &&
        !title.isUpdate &&
        !this.downloadedIds.includes(title.id)
    );

    // List of Downloaded DLCs
    this.downloadedDLCs = this.titles.filter(
      (title) => title.isDLC && this.downloadedIds.includes(title.id)
    );

    // List of Not Downloaded DLCs
    this.notDownloadedDLCs = this.titles.filter(
      (title) => title.isDLC && !this.downloadedIds.includes(title.id)
    );

    // List of Downloaded Updates
    this.downloadedUpdates = this.titles.filter(
      (title) => title.isUpdate && this.downloadedIds.includes(title.id)
    );

    // List of Not Downloaded DLCs
    this.notDownloadedUpdates = this.titles.filter(
      (title) => title.isUpdate && !this.downloadedIds.includes(title.id)
    );
  }

  titleDialog(title: NutTitle): void {
    const myDLCs = this.downloadedDLCs
      .filter((dlc) => dlc.baseId === title.id)
      .sort((dlc) => dlc.releaseDate);

    const remoteDLCs = this.notDownloadedDLCs
      .filter((dlc) => dlc.baseId === title.id)
      .sort((dlc) => dlc.releaseDate);

    let update: NutGame | undefined;
    if (title.updateId) {
      update = this.search.find((game) => game.id === title.updateId);
      if (update) {
        update.version = update ? update.version / 65536 : 0;
      }
    }

    this.dialog
      .open(TitleDialogComponent, {
        data: {
          title,
          update,
          myDLCs,
          remoteDLCs,
        },
      })
      .afterClosed()
      .toPromise()
      .finally(() => this.resetTitle());
  }

  // Material.io recommended Grid breakpoints
  // https://material.io/design/layout/responsive-layout-grid.html#breakpoints
  setCols(): void {
    this.cols = window.innerWidth < 600 ? 4 : window.innerWidth < 840 ? 8 : 14;
  }

  // Minimum columns mathching maximum col/row span (Mobile Full Screen)
  getGridSpan(title: NutTitle): number {
    const numberOfTitles = this.downloadedTitles.length;
    const position = this.rankedDownloadedTitles.indexOf(title);
    return position <= numberOfTitles / 4
      ? 4
      : position <= numberOfTitles / 2
      ? 2
      : 1;
  }

  getIcon(title: NutTitle): string {
    if (environment.production) {
      return `/api/titleImage/${title.id}/${this.getGridSpan(title) * 200}`;
    }
    return `/assets/images/${title.id}/icon.jpg`;
  }

  getBanner(title: NutTitle): string {
    if (environment.production) {
      return `/api/bannerImage/${title.id}`;
    }
    return `/assets/images/${title.id}/banner.jpg`;
  }

  getScreenshot(title: NutTitle, i: number): string {
    if (environment.production) {
      return `/api/screenshotImage/${title.id}/${i}`;
    }
    return `/assets/images/${title.id}/screenshot${i}.jpg`;
  }

  // General Purpose Status Messages
  alert(message: string): void {
    this.snack.open(message, 'Ok', {
      duration: 3000,
    });
  }

  // Page title reset
  resetTitle(): void {
    this.pageTitle.setTitle('Nut - Library');
  }
}
