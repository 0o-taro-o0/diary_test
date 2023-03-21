import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AppRoutingModule} from './app-routing.module';
import {ThumbnailComponent} from './components/dashboard/thumbnail/thumbnail.component';
import {HttpClientModule} from "@angular/common/http";
import {registerLocaleData} from "@angular/common";
import localeJa from "@angular/common/locales/ja"
import {DiaryService} from "./services/diary.service";
import {ImageService} from "./services/image.service";
import { EditorjsComponent } from './components/editorjs/editorjs.component';
import { ViewerComponent } from './components/viewer/viewer.component';
import { ViewerContentComponent } from './components/viewer/viewer-content/viewer-content.component';
import {FormsModule} from "@angular/forms";

registerLocaleData(localeJa, 'ja-JP')

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ThumbnailComponent,
    EditorjsComponent,
    ViewerComponent,
    ViewerContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [{provide: LOCALE_ID, useValue: 'ja-JP'}, DiaryService, ImageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
