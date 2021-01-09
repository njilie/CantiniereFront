import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm: FormGroup;
  submitted = false;
  clickSubmit = false;
  message: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
    ) {
    this.userForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
      ])],
      password: ['', Validators.compose([
        Validators.required,
        //Validators.minLength(8),
        //Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[%!.&$?*]).{8,}$')
      ])]
    });
   }

  ngOnInit(): void {
  }

  get email(){
    return this.userForm.get('email');
  }
  get password(){
    return this.userForm.get('password');
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.authService.login(this.userForm.value).subscribe(
        (data) => {
          if(this.userForm.controls['email'].value == 'admin@gmail.com'){
          
          }
        this.router.navigate(['/']);
        },
        (error) => {
          if (error.status === 401) {
            this.message = "Vous n'avez pas bien saisi vos informations";
          }
        }
      );
    }
  }
  
  registerUser(){
    this.router.navigate(['/register']);
  }

  valide(){
    this.clickSubmit = true;
  }

}
