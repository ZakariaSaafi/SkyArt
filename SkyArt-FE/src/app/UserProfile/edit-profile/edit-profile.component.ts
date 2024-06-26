import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user = {
    username: '',
    email: '',
    bio: '',
    avatar: ''
  };

  selectedFile: any;


  constructor() { }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    // Handle form submission and update the user profile
    const formData = new FormData();
    formData.append('username', this.user.username);
    formData.append('email', this.user.email);
    formData.append('bio', this.user.bio);
    // if (this.selectedFile) {
    //   formData.append('avatar', this.selectedFile, this.selectedFile.name);
    // }

    // this.authService.updateUser(formData).subscribe(response => {
    //   console.log('Profile updated successfully');
    // }, error => {
    //   console.error('Error updating profile', error);
    // });
  }

}
