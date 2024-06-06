import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./HomePage/homepage/homepage.component";
import {PostSearchPageComponent} from "./PostPage/post-search-page/post-search-page.component";

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: "posts-search-page", component: PostSearchPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
