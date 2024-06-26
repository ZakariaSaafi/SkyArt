import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./HomePage/homepage/homepage.component";
import {PostSearchPageComponent} from "./PostPage/post-search-page/post-search-page.component";
import {CategoriesSearchPageComponent} from "./CategoryPage/categories-search-page/categories-search-page.component";
import {EventSearchPageComponent} from "./EventPage/event-search-page/event-search-page.component";
import {LoginPageComponent} from "./AuthentificationPage/login-page/login-page.component";
import {SignupPageComponent} from "./AuthentificationPage/signup-page/signup-page.component";

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: "posts-search-page", component: PostSearchPageComponent},
  {path: "categories-search-page", component: CategoriesSearchPageComponent},
  {path: "events-search-page", component: EventSearchPageComponent},
  {path: "login-page", component: LoginPageComponent},
  {path: "signup-page", component: SignupPageComponent},
  { path: 'feedback', loadChildren: () => import('./feedbacks/feedbacks.module').then(m => m.FeedbacksModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
