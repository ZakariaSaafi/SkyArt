import { Component, OnInit } from '@angular/core';
import {CategoriesService} from "../../../services/category/categories.service";

@Component({
  selector: 'app-categories-search-page',
  templateUrl: './categories-search-page.component.html',
  styleUrls: ['./categories-search-page.component.css']
})
export class CategoriesSearchPageComponent implements OnInit {

  categories :any;
  public errorMsg:any;


  constructor(private categoryService:CategoriesService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      (data:any)=>{
        this.categories = data;
      },error => {
        console.log(error);
        this.errorMsg  = error;
      }
    );
  }

}
