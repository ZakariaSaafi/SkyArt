import { Component, OnInit } from '@angular/core';
import {NgxDropzoneChangeEvent} from "ngx-dropzone";
import {CategoriesService} from "../../../services/category/categories.service";
import {PostService} from "../../../services/post/post.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/User/auth.service";

@Component({
  selector: 'app-add-new-post-page',
  templateUrl: './add-new-post-page.component.html',
  styleUrls: ['./add-new-post-page.component.css']
})
export class AddNewPostPageComponent implements OnInit {
 public post : any;
 public categories : any = [];
 public selectecCategory: any;
 public form:FormGroup|any;
 public isLoggedIn:boolean=false;
 //dropzone
 public files: File[] = [];
 public maxFiles: number = 8;


  constructor(private formBuilder:FormBuilder, public authService:AuthService ,private categoryService:CategoriesService, private postService: PostService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      (data:any)=>{
        this.categories = data;
      },(error)=>{
        console.log(error);
      }
    );
    if(localStorage.getItem("artistData") || localStorage.getItem("artistToken")){
      this.isLoggedIn = true;
    }
    this.form = this.formBuilder.group({
      title:['',Validators.required],
      category :['',Validators.required],
      description:['',Validators.required],
      images :['',Validators.required],
    });

  }

  onSubmit(value:any){
    console.log(value)
    this.postService.addPost(value).subscribe((data:any)=>{
      console.log(data);
      this.post=data;
      alert("Successfully added new post!");
      this.form.reset();
    })
  }



  onSelect(event: NgxDropzoneChangeEvent) {
    console.log(event);
    const totalFiles = this.files.length + event.addedFiles.length;
    if (totalFiles <= this.maxFiles) {
      this.files.push(...event.addedFiles);
    } else {
      const remainingSlots = this.maxFiles - this.files.length;
      if (remainingSlots > 0) {
        this.files.push(...event.addedFiles.slice(0, remainingSlots));
        var reader=new FileReader();
        reader.readAsDataURL(this.files[0]);
        reader.onload=(_event)=>{
          this.form.images.add(reader.result);
        }
      }
      alert(`You can only upload a maximum of ${this.maxFiles} files.`);
    }
  }

    onRemove(event:any) {
      console.log(event);
      this.files.splice(this.files.indexOf(event), 1);
    }

    removeAll() {
      this.files = [];
    }

  categoryChange(e:any){
    console.log(e.target.value);
    this.selectecCategory=e.target.value;
  }

}
