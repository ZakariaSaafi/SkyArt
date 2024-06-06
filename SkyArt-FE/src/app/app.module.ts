import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './HomePage/homepage/homepage.component';
import {HttpClientModule} from "@angular/common/http";
import { PostSearchPageComponent } from './PostPage/post-search-page/post-search-page.component';
import { PostDetailPageComponent } from './PostPage/post-detail-page/post-detail-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    PostSearchPageComponent,
    PostDetailPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
