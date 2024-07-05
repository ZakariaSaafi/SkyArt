import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./HomePage/homepage/homepage.component";
import {PostSearchPageComponent} from "./PostPage/post-search-page/post-search-page.component";
import {CategoriesSearchPageComponent} from "./CategoryPage/categories-search-page/categories-search-page.component";
import {EventSearchPageComponent} from "./EventPage/event-search-page/event-search-page.component";
import {LoginPageComponent} from "./AuthentificationPage/login-page/login-page.component";
import {SignupPageComponent} from "./AuthentificationPage/signup-page/signup-page.component";
import {UserProfileComponent} from "./UserProfile/user-profile/user-profile.component";
import {AddNewPostPageComponent} from "./PostPage/add-new-post-page/add-new-post-page.component";
import {EditProfileComponent} from "./UserProfile/edit-profile/edit-profile.component";
import {PostDetailPageComponent} from "./PostPage/post-detail-page/post-detail-page.component";
import {CategoryDetailPageComponent} from "./CategoryPage/category-detail-page/category-detail-page.component";
import {AllArtistComponent} from "./all-artist/all-artist.component";

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: "posts-search-page", component: PostSearchPageComponent},
  {path: "post-detail-page/:id", component: PostDetailPageComponent},
  {path: "add-new-post-page", component: AddNewPostPageComponent},
  {path: "categories-search-page", component: CategoriesSearchPageComponent},
  {path: "category-detail-page/:id", component: CategoryDetailPageComponent},
  {path: "events-search-page", component: EventSearchPageComponent},
  {path: "login-page", component: LoginPageComponent},
  {path: "signup-page", component: SignupPageComponent},
  {path: "profile", component: UserProfileComponent},
  {path: "edit-profile", component: EditProfileComponent },
  {path: "all-artist", component: AllArtistComponent },

 
  { path: 'feedback', loadChildren: () => import('./feedbacks/feedbacks.module').then(m => m.FeedbacksModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
