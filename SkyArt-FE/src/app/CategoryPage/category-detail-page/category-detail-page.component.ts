import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CategoriesService} from "../../../services/category/categories.service";

@Component({
  selector: 'app-category-detail-page',
  templateUrl: './category-detail-page.component.html',
  styleUrls: ['./category-detail-page.component.css']
})
export class CategoryDetailPageComponent implements OnInit {
  category: any;
  constructor(private categoryService:CategoriesService ,private route: ActivatedRoute) { }

  ngOnInit(): void {
    const categoryId = this.route.snapshot.paramMap.get('id');
    this.categoryService.getCategoryById(categoryId).subscribe(data => {
      this.category = data;
    });
  }

  viewPost(postId: string): void {
    // Logic to navigate to the post detail page
    // For example:
    // this.router.navigate(['/post', postId]);
  }

}
