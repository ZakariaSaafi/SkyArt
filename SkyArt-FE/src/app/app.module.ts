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
import { UserProfileComponent } from './UserProfile/user-profile/user-profile.component';
import { AddNewPostPageComponent } from './PostPage/add-new-post-page/add-new-post-page.component';
import {FormsModule} from "@angular/forms";
import { EditProfileComponent } from './UserProfile/edit-profile/edit-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrdersPageComponent } from './OrderPage/orders-page/orders-page.component';
import { CategoryDetailPageComponent } from './CategoryPage/category-detail-page/category-detail-page.component';
import {NgxDropzoneModule} from "ngx-dropzone";
import { HeaderUserComponent } from './HomePage/headerUser/header-user/header-user.component';
import { AllArtistComponent } from './all-artist/all-artist.component';
import { OrderHistoryPageComponent } from './OrderPage/order-history-page/order-history-page.component';


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
    FooterComponent,
    UserProfileComponent,
    AddNewPostPageComponent,
    EditProfileComponent,
    CategoryDetailPageComponent,
    AllArtistComponent,
    HeaderUserComponent,
    OrdersPageComponent,
    CategoryDetailPageComponent,
    OrderHistoryPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxDropzoneModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
