import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MatBadgeModule } from '@angular/material/badge'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatDialogModule } from '@angular/material/dialog'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatMenuModule } from '@angular/material/menu'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTooltipModule } from '@angular/material/tooltip'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ClipboardModule } from 'ngx-clipboard'

import { AppComponent } from './app.component'
import { FileSizePipe } from './pipes/file-size.pipe'
import { NutService } from './services/nut.service'
import { TinfoilService } from './services/tinfoil.service'
import { TitleDialogComponent } from './title-dialog/title-dialog.component'

@NgModule({
  declarations: [AppComponent, TitleDialogComponent, FileSizePipe],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatInputModule,
    MatGridListModule,
    MatTooltipModule,
    MatToolbarModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatBadgeModule,
    ClipboardModule
  ],
  exports: [],
  providers: [NutService, TinfoilService],
  bootstrap: [AppComponent]
})
export class AppModule {}
