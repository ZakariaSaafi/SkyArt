import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/User/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
  signupFormUser!: FormGroup;
  signupFormArtist!: FormGroup;
  userImage!: string;
  artistImage!: string;

  constructor(private fb: FormBuilder, private AuthService: AuthService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.signupFormUser = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      Image: [''],
    });
    this.signupFormArtist = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      Image: [''],
      phoneNumber: ['', Validators.required],
      bioghraphy: ['', Validators.required],
    });
  }

  onFileSelected(event: Event, formType: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result as string;
        if (formType === 'user') {
          this.userImage = base64Image;
        } else if (formType === 'artist') {
          this.artistImage = base64Image;
        }
      };
      reader.readAsDataURL(file);
    }
  }
  onSubmitArtist(): void {
    console.log('okay')
    if (this.signupFormArtist.valid) {
      const formData = new FormData();
      formData.append('name', this.signupFormArtist.get('name')!.value);
      formData.append('email', this.signupFormArtist.get('email')!.value);
      formData.append('password', this.signupFormArtist.get('password')!.value);
      formData.append('phoneNumber', this.signupFormArtist.get('phoneNumber')!.value);
      formData.append('bioghraphy', this.signupFormArtist.get('bioghraphy')!.value);
      if (this.artistImage) {
        formData.append('image', this.dataURLtoFile(this.artistImage, 'artistImage.png'));
      }
      this.AuthService.signupArtist(formData).subscribe(response => {
        console.log(response.Artist);
        alert('Artist Signup Successful');
        localStorage.setItem('artistData', JSON.stringify(response.Artist));
        this.router.navigate(['/profile']);
      }, error => {
        console.error(error);
        //alert("Try again, email seems to be existed");
      });
    }
  }

  onSubmitUser(): void {
    if (this.signupFormUser.valid) {
      const formData = new FormData();
      formData.append('name', this.signupFormUser.get('name')!.value);
      formData.append('email', this.signupFormUser.get('email')!.value);
      formData.append('password', this.signupFormUser.get('password')!.value);
      if (this.userImage) {
        formData.append('image', this.dataURLtoFile(this.userImage, 'userImage.png'));
      }

      this.AuthService.signupUser(formData).subscribe(response => {
        console.log(response);
        alert('User Signup Successful');
        localStorage.setItem('userData', JSON.stringify(response.Artist));
        this.router.navigate(['/']);
      }, error => {
        console.error(error);
        alert("Try again, email seems to be existed");
      });
    }
  }

  dataURLtoFile(dataurl: string, filename: string): File {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
}
