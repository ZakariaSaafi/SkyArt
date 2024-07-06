import { Component, OnInit } from '@angular/core';
import {NgxDropzoneChangeEvent} from "ngx-dropzone";

@Component({
  selector: 'app-add-new-post-page',
  templateUrl: './add-new-post-page.component.html',
  styleUrls: ['./add-new-post-page.component.css']
})
export class AddNewPostPageComponent implements OnInit {

 public files: File[] = [];
 public maxFiles: number = 8;

  constructor() { }

  ngOnInit(): void {
  }
  onSelect(event: NgxDropzoneChangeEvent) {
    const totalFiles = this.files.length + event.addedFiles.length;
    if (totalFiles <= this.maxFiles) {
      this.files.push(...event.addedFiles);
    } else {
      const remainingSlots = this.maxFiles - this.files.length;
      if (remainingSlots > 0) {
        this.files.push(...event.addedFiles.slice(0, remainingSlots));
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

}
