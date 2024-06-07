import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './HomePage/homepage/homepage.component';
import {HttpClientModule} from "@angular/common/http";
import { PostSearchPageComponent } from './PostPage/post-search-page/post-search-page.component';
import { PostDetailPageComponent } from './PostPage/post-detail-page/post-detail-page.component';
import { CategoriesSearchPageComponent } from './CategoryPage/categories-search-page/categories-search-page.component';
import { EventSearchPageComponent } from './EventPage/event-search-page/event-search-page.component';
import { LoginPageComponent } from './AuthentificationPage/login-page/login-page.component';
import { SignupPageComponent } from './AuthentificationPage/signup-page/signup-page.component';
import { HeaderComponent } from './HomePage/header/header.component';
import { FooterComponent } from './HomePage/footer/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    PostSearchPageComponent,
    PostDetailPageComponent,
    CategoriesSearchPageComponent,
    EventSearchPageComponent,
    LoginPageComponent,
    SignupPageComponent,
    HeaderComponent,
    FooterComponent
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
