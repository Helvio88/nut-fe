import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { ClipboardModule } from 'ngx-clipboard';

import { AppComponent } from './app.component';
import { NutService } from './services/nut.service';
import { TinfoilService } from './services/tinfoil.service';
import { TitleDialogComponent } from './title-dialog/title-dialog.component';
import { FileSizePipe } from './pipes/file-size.pipe';

@NgModule({
  declarations: [AppComponent, TitleDialogComponent, FileSizePipe],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatTooltipModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatSnackBarModule,
    MatBadgeModule,
    ClipboardModule,
  ],
  exports: [],
  providers: [NutService, TinfoilService],
  bootstrap: [AppComponent],
})
export class AppModule {}
