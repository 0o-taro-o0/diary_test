import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AppRoutingModule} from './app-routing.module';
import {ThumbnailComponent} from './dashboard/thumbnail/thumbnail.component';
import {HttpClientModule} from "@angular/common/http";
import {registerLocaleData} from "@angular/common";
import localeJa from "@angular/common/locales/ja"
import {DiaryService} from "./services/diary.service";
import {ImageService} from "./services/image.service";
import { EditorjsComponent } from './editorjs/editorjs.component';

registerLocaleData(localeJa, 'ja-JP')

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ThumbnailComponent,
    EditorjsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

  ],
  providers: [{provide: LOCALE_ID, useValue: 'ja-JP'}, DiaryService, ImageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
